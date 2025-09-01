import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  createExam(userId: string, data: CreateExamDto) {
    return this.prisma.exam.create({ data: { ...data, userId } });
  }
}
