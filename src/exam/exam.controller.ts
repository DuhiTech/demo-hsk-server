import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateExamDto, ExamDto, UpdateExamDto } from './dto';
import { Roles, User } from 'src/auth/decorators';
import { Role } from 'types/enums';
import UserMetadata from 'types/user-metadata';
import { BulkIdsDto, PageDto, PaginationQueryDto } from 'src/common/dto';

@ApiBearerAuth()
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOperation({ summary: 'Tạo đề thi mới' })
  @ApiResponse({ status: 201, type: ExamDto })
  @Roles(Role.Lecturer)
  @Post()
  createExam(@Body() data: CreateExamDto, @User('id') userId: string) {
    return this.examService.createExam(data, userId);
  }

  @ApiOperation({ summary: 'Cập nhật đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @Roles(Role.Lecturer)
  @Put(':id')
  updateExam(@Param('id') id: string, @Body() data: UpdateExamDto, @User('id') userId: string) {
    return this.examService.updateExam(id, data, userId);
  }

  @ApiOperation({ summary: 'Xóa đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @Roles(Role.Admin, Role.Lecturer)
  @Delete(':id')
  deleteExam(@Param('id') id: string, @User() user: UserMetadata) {
    return this.examService.deleteExam(id, user);
  }

  @ApiOperation({ summary: 'Phục hồi đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @Roles(Role.Admin, Role.Lecturer)
  @Post('/restore')
  restoreExam(@Body() data: BulkIdsDto, @User() user: UserMetadata) {
    return this.examService.restoreExams(data.ids, user);
  }

  @ApiOperation({ summary: 'Xóa vĩnh viễn đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @Roles(Role.Admin, Role.Lecturer)
  @Post('/destroy')
  destroyExam(@Body() data: BulkIdsDto, @User() user: UserMetadata) {
    return this.examService.destroyExams(data.ids, user);
  }

  @ApiOperation({ summary: 'Lấy đề thi theo ID' })
  @ApiResponse({ status: 200, type: ExamDto })
  @Roles(Role.Admin, Role.Lecturer)
  @Get(':id')
  getExamById(@Param('id') id: string, @User() user: UserMetadata) {
    return this.examService.getExamById(id, user);
  }

  @ApiOperation({ summary: 'Lấy đề thi' })
  @ApiResponse({ status: 200, type: PageDto<ExamDto> })
  @Roles()
  @Get()
  getExams(@Query() q: PaginationQueryDto<ExamDto>, @User() user: UserMetadata) {
    return this.examService.getExams(q, user);
  }
}
