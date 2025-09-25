import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto';

export class SectionDto extends BaseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  examId: string;

  @ApiProperty({ example: 'Phần viết' })
  title: string;

  @ApiProperty({ example: 'Mô tả', type: 'string', required: false })
  description?: string | null;

  @ApiProperty({ example: 60 })
  timeLimit: number;

  @ApiProperty({ example: 1 })
  order: number;
}
