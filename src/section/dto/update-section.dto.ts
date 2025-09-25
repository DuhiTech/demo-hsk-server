import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSectionDto {
  @ApiProperty({ example: 'Phần nghe', minLength: 3, maxLength: 255 })
  @IsString()
  @MinLength(3, { message: 'Tiêu đề ít nhất 3 kí tự' })
  @MaxLength(255, { message: 'Tiêu đề không được vượt quá 255 kí tự' })
  title: string;

  @ApiProperty({ example: 'Mô tả', maxLength: 1000, required: false })
  @IsString()
  @MaxLength(255, { message: 'Mô tả không được vượt quá 1000 kí tự' })
  description?: string;

  @ApiProperty({ example: 60, minimum: 0 })
  @IsInt()
  @IsPositive({ message: 'Thời gian phải lớn hơn 0' })
  timeLimit: number;
}
