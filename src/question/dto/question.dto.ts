import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from 'types/enums';

export class OptionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Option 1' })
  content: string;

  @ApiProperty({ example: 'false', required: false, nullable: true })
  isCorrect: boolean;

  @ApiProperty({ example: 1, required: false, nullable: true })
  position: number | null;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: false, nullable: true })
  matchId: string | null;

  @ApiProperty({ type: 'integer' })
  order: number;
}

export class QuestionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  sectionId: string;

  @ApiProperty({ example: 'Nội dung' })
  content?: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ example: QuestionType.SingleChoice, enum: QuestionType })
  type: QuestionType;

  @ApiProperty({ type: OptionDto, isArray: true })
  options: OptionDto[];
}
