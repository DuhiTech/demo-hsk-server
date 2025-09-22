import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/dto';

export class ExamDto extends BaseDto {
  @ApiProperty({ example: 'Đề thi HSK 1' })
  title: string;

  @ApiProperty({ example: 'Mô tả' })
  description?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @Exclude()
  isDeleted: boolean;
}
