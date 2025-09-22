import { ConflictException, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async createExam(userId: string, data: CreateExamDto) {
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
}
