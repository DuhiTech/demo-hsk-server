import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto, UpdateExamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import UserMetadata from 'types/user-metadata';
import { Role } from 'types/enums';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async createExam(data: CreateExamDto, userId: string) {
    const title = data.title.trim();

    try {
      return await this.prisma.exam.create({ data: { ...data, title, userId } });
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

    return await this.prisma.exam.update({ where: { id, isDeleted: false }, data: { isDeleted: true } });
  }

  async getExamById(id: string, user: UserMetadata) {
    const exam = await this.prisma.exam.findUnique({ where: { id, isDeleted: false } });

    if (!exam) throw new NotFoundException('Exam not found');

    if (user.role !== Role.Admin && user.id !== exam.userId) {
      throw new ForbiddenException('You cannot get this exam');
    }

    return exam;
  }
}
