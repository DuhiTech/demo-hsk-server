import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ example: 'Đề thi HSK 1', minLength: 3, maxLength: 255, required: true })
  @IsString()
  @MinLength(3, { message: 'Tiêu đề ít nhất 3 kí tự' })
  @MaxLength(255, { message: 'Tiêu đề không được vượt quá 255 kí tự' })
  title: string;

  @ApiProperty({ example: 'Mô tả', maxLength: 1000 })
  @IsString()
  @MaxLength(255, { message: 'Mô tả không được vượt quá 1000 kí tự' })
  description?: string;
}
