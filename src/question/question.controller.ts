import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionDto, QuestionInputDto } from './dto';
import { Role } from 'types/enums';
import { Roles, User } from 'src/auth/decorators';
import { QuestionService } from './question.service';
import UserMetadata from 'types/user-metadata';

@ApiBearerAuth()
@Controller('sections/:sectionId/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Tạo hoặc cập nhật nhiều câu hỏi' })
  @ApiResponse({ status: 200, type: QuestionDto })
  @ApiBody({ type: QuestionInputDto, isArray: true })
  @Roles(Role.Admin, Role.Lecturer)
  @Post()
  bulkUpsert(@Param('sectionId') sectionId: string, @Body() data: QuestionInputDto[], @User() user: UserMetadata) {
    return this.questionService.bulkUpsert(sectionId, data, user);
  }

  @ApiOperation({ summary: 'Lấy tất cả câu hỏi' })
  @ApiResponse({ status: 200, type: QuestionDto, isArray: true })
  @Roles(Role.Admin, Role.Lecturer)
  @Get()
  getQuestions(@Param('sectionId') sectionId: string, @User() user: UserMetadata) {
    return this.questionService.getQuestions(sectionId, user);
  }
}
