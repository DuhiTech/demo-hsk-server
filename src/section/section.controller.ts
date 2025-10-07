import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { SectionService } from './section.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'types/enums';
import { Roles, User } from 'src/auth/decorators';
import { CreateSectionDto, SectionDto, UpdateSectionDto } from './dto';
import UserMetadata from 'types/user-metadata';

@ApiBearerAuth()
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOperation({ summary: 'Tạo phần thi mới' })
  @ApiResponse({ status: 201, type: SectionDto })
  @Roles(Role.Lecturer, Role.Admin)
  @Post()
  createExam(@Body() data: CreateSectionDto, @User() user: UserMetadata) {
    return this.sectionService.createSection(data, user);
  }

  @ApiOperation({ summary: 'Cập nhật phần thi' })
  @ApiResponse({ status: 200, type: SectionDto })
  @Roles(Role.Lecturer, Role.Admin)
  @Put(':id')
  updateExam(@Param('id') id: string, @Body() data: UpdateSectionDto, @User() user: UserMetadata) {
    return this.sectionService.updateSection(id, data, user);
  }

  @ApiOperation({ summary: 'Cập nhật phần thi' })
  @ApiResponse({ status: 200, type: SectionDto })
  @Roles(Role.Lecturer, Role.Admin)
  @Delete(':id')
  deleteExam(@Param('id') id: string, @User() user: UserMetadata) {
    return this.sectionService.deleteSection(id, user);
  }
}
