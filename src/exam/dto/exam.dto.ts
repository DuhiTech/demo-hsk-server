import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/dto';
import { SectionDto } from 'src/section/dto';

export class ExamDto extends BaseDto {
  @ApiProperty({ example: 'Đề thi HSK 1' })
  title: string;

  @ApiProperty({ example: 'Mô tả' })
  description?: string | null;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ example: [], isArray: true })
  sections: SectionDto[] = [];
}
