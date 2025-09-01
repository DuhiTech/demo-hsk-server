import { Body, Controller, Post } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateExamDto, ExamDto } from './dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@ApiBearerAuth()
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOperation({ summary: 'Tạo đề thi mới' })
  @ApiResponse({ status: 201, type: ExamDto })
  @Roles()
  @Post()
  createExam(@Body() data: CreateExamDto, @User('id') userId: string) {
    return this.examService.createExam('', data);
  }
}
