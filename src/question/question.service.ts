import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptionInputDto, QuestionInputDto } from './dto';
import UserMetadata from 'types/user-metadata';
import { Role } from 'types/enums';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  private async canEditExam(user: UserMetadata, examId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId, isDeleted: false },
      select: { id: true, userId: true },
    });
    if (!exam) throw new NotFoundException('Exam not found');
    if (user.role !== Role.Admin && user.id !== exam.userId) throw new ForbiddenException();
  }

  async bulkUpsert(sectionId: string, data: QuestionInputDto[], user: UserMetadata) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId, exam: { isDeleted: false } },
      select: { id: true, examId: true },
    });

    if (!section) throw new NotFoundException('Section not found');

    await this.canEditExam(user, section.examId);

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.question.findMany({
        where: { sectionId },
        select: { id: true },
      });

      const existingIds = new Set(existing.map((q) => q.id));
      const incomingIds = new Set(data.filter((i) => i.id).map((i) => i.id));

      for (let i = 0; i < data.length; i++) {
        const q = data[i];
        const order = i + 1;

        if (q.id && existingIds.has(q.id)) {
          await tx.question.update({
            where: { id: q.id },
            data: {
              type: q.type,
              content: q.content.trim(),
              grade: q.grade ?? 1,
              order,
            },
          });
        } else {
          const temp = await tx.question.create({
            data: {
              sectionId,
              type: q.type,
              content: q.content.trim(),
              grade: q.grade ?? 1,
              order,
            },
          });
          q.id = temp.id;
        }

        await this.upsertOptionsForQuestions(tx, q.id, q.options);
      }

      const missingIds = [...existingIds].filter((id) => !incomingIds.has(id));

      if (missingIds.length) {
        await tx.question.deleteMany({
          where: { id: { in: missingIds } },
        });
      }

      return tx.question.findMany({
        where: { sectionId },
        orderBy: { order: 'asc' },
      });
    });
  }

  async upsertOptionsForQuestions(tx: Prisma.TransactionClient, questionId: string, options: OptionInputDto[]) {
    const existing = await tx.option.findMany({
      where: { questionId },
      select: { id: true },
      orderBy: { order: 'asc' },
    });
    const existingIds = new Set(existing.map((o) => o.id));
    const incomingIds = new Set(options.filter((o) => o.id).map((o) => o.id));

    for (let i = 0; i < options.length; i++) {
      const o = options[i];
      const order = i + 1;
      if (o.isCorrect === undefined && !o.matchId && !o.position) throw new BadRequestException('Option is invalid');
      if (o.id && existingIds.has(o.id)) {
        await tx.option.update({
          where: { id: o.id },
          data: {
            ...o,
            order,
          },
        });
      } else {
        await tx.option.create({
          data: {
            ...o,
            order,
            questionId,
          },
        });
      }
    }

    const missingIds = [...existingIds].filter((id) => !incomingIds.has(id));

    if (missingIds.length) {
      await tx.option.deleteMany({
        where: { id: { in: missingIds } },
      });
    }
  }

  async getQuestions(sectionId: string, user: UserMetadata) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId, exam: { isDeleted: false } },
      select: { id: true, examId: true },
    });

    if (!section) throw new NotFoundException('Section not found');

    await this.canEditExam(user, section.examId);

    return this.prisma.question.findMany({
      where: { sectionId },
      select: {
        id: true,
        content: true,
        grade: true,
        order: true,
        type: true,
        options: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }
}
