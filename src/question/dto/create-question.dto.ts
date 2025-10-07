import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'types/enums';

export class OptionInputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: false })
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ example: 'Option 1' })
  @IsString()
  @MaxLength(2000)
  content: string;

  @ApiProperty({ example: 'false', required: false })
  @IsBoolean()
  isCorrect?: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  position?: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: false })
  @IsUUID('4')
  matchId?: string;
}

export class QuestionInputDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', required: false })
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ example: 'Nội dung' })
  @IsString()
  @MaxLength(2000)
  content: string;

  @ApiProperty({ example: QuestionType.SingleChoice, enum: QuestionType })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ example: 1, required: false })
  @IsDecimal()
  @Min(0)
  grade?: number = 1;

  @ApiProperty({ isArray: true, type: OptionInputDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionInputDto)
  options: OptionInputDto[];
}
