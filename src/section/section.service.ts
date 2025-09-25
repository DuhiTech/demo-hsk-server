import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserMetadata from 'types/user-metadata';
import { Role } from 'types/enums';
import { CreateSectionDto, UpdateSectionDto } from './dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  private async canEditExam(user: UserMetadata, examId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId, isDeleted: false },
      select: { id: true, userId: true },
    });
    if (!exam) throw new NotFoundException('Exam not found');
    if (user.role !== Role.Admin && user.id !== exam.userId) throw new ForbiddenException();
  }

  async createSection(data: CreateSectionDto, user: UserMetadata) {
    await this.canEditExam(user, data.examId);

    return this.prisma.$transaction(async (tx) => {
      const max = await tx.section.aggregate({
        where: { examId: data.examId },
        _max: { order: true },
      });

      const order = (max._max.order ?? 0) + 1;

      return await tx.section.create({
        data: {
          ...data,
          title: data.title.trim(),
          order,
        },
      });
    });
  }

  async updateSection(id: string, data: UpdateSectionDto, user: UserMetadata) {
    const existing = await this.prisma.section.findUnique({
      where: { id },
      select: { id: true, examId: true },
    });

    if (!existing) throw new NotFoundException('Section not found');

    await this.canEditExam(user, existing.examId);

    return this.prisma.section.update({
      where: { id },
      data: { ...data, title: data.title.trim() },
    });
  }

  async deleteSection(id: string, user: UserMetadata) {
    const existing = await this.prisma.section.findUnique({ where: { id }, select: { id: true, examId: true } });

    if (!existing) throw new NotFoundException('Section not found');

    await this.canEditExam(user, existing.examId);

    return await this.prisma.section.delete({ where: { id } });
  }
}
