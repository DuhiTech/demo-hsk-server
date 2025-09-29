import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto, ExamDto, UpdateExamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import UserMetadata from 'types/user-metadata';
import { Role } from 'types/enums';
import { PageDto, PaginationQueryDto } from 'src/common/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  private SELECT: Prisma.ExamSelect = {
    id: true,
    title: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    closeAt: true,
    openAt: true,
  };

  async createExam(data: CreateExamDto, userId: string) {
    const title = data.title.trim();

    try {
      return await this.prisma.exam.create({ data: { ...data, title, userId }, select: this.SELECT });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Exam title already exists for this user');
      }
      throw error;
    }
  }

  async updateExam(id: string, data: UpdateExamDto, userId: string) {
    const existing = await this.prisma.exam.findUnique({
      where: { id, isDeleted: false },
      select: { id: true, userId: true },
    });

    if (!existing) throw new NotFoundException('Exam not found');

    if (existing.userId !== userId) {
      throw new ForbiddenException('You cannot update this exam');
    }

    const title = data.title.trim();

    try {
      return await this.prisma.exam.update({
        where: { id },
        data: { ...data, title },
        select: this.SELECT,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Exam title already exists for this user');
      }
      throw error;
    }
  }

  async deleteExam(id: string, user: UserMetadata) {
    const exam = await this.prisma.exam.findUnique({ where: { id, isDeleted: false } });

    if (!exam) throw new NotFoundException('Exam not found');

    if (user.role !== Role.Admin && user.id !== exam.userId) {
      throw new ForbiddenException('You cannot get this exam');
    }

    return await this.prisma.exam.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true },
      select: this.SELECT,
    });
  }

  restoreExams(ids: string[], user: UserMetadata) {
    return this.prisma.$transaction(async (tx) => {
      const accessible = await tx.exam.findMany({
        where: {
          id: { in: ids },
          isDeleted: true,
          ...(user.role === Role.Admin ? {} : { userId: user.id }),
        },
        select: { id: true },
      });

      const toRestoreIds = accessible.map((x) => x.id);

      if (toRestoreIds.length > 0) {
        await tx.exam.updateMany({ where: { id: { in: toRestoreIds } }, data: { isDeleted: false } });
      }

      const accessibleSet = new Set(toRestoreIds);
      const skipped = ids
        .filter((id) => !accessibleSet.has(id))
        .map((id) => ({ id, reason: 'forbidden-or-not-found' }));

      return { count: toRestoreIds.length, restore: toRestoreIds, skipped };
    });
  }

  destroyExams(ids: string[], user: UserMetadata) {
    return this.prisma.$transaction(async (tx) => {
      const accessible = await tx.exam.findMany({
        where: {
          id: { in: ids },
          ...(user.role === Role.Admin ? {} : { userId: user.id }),
        },
        select: { id: true },
      });

      const toDeleteIds = accessible.map((x) => x.id);

      if (toDeleteIds.length > 0) {
        await tx.exam.deleteMany({ where: { id: { in: toDeleteIds } } });
      }

      const accessibleSet = new Set(toDeleteIds);
      const skipped = ids
        .filter((id) => !accessibleSet.has(id))
        .map((id) => ({ id, reason: 'forbidden-or-not-found' }));

      return { count: toDeleteIds.length, delete: toDeleteIds, skipped };
    });
  }

  async getExamById(id: string, user: UserMetadata) {
    const exam = await this.prisma.exam.findUnique({
      where: { id, isDeleted: false },
      select: {
        ...this.SELECT,
        sections: true,
      },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    if (user.role !== Role.Admin && user.id !== exam.userId) {
      throw new ForbiddenException('You cannot get this exam');
    }

    return exam;
  }

  async getExams(query: PaginationQueryDto<ExamDto>, user: UserMetadata): Promise<PageDto<ExamDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const baseWhere: Prisma.ExamWhereInput =
      user.role === Role.Admin ? {} : user.role === Role.Lecturer ? { userId: user.id } : { isPublished: true };

    const where: Prisma.ExamWhereInput = {
      AND: [
        baseWhere,
        query.search ? { title: { contains: query.search, mode: 'insensitive' } } : {},
        { isDeleted: false },
      ],
    };

    const orderBy: Prisma.ExamOrderByWithRelationInput | undefined = query.sortBy
      ? { [query.sortBy]: query.order ?? 'asc' }
      : undefined;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          ...this.SELECT,
          sections: true,
          ...(user.role !== Role.Student ? { isPublished: true } : {}),
        },
      }),
      this.prisma.exam.count({ where }),
    ]);

    return {
      items,
      limit,
      page,
      total,
    };
  }
}
