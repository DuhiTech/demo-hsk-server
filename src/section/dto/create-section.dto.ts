import { ApiProperty } from '@nestjs/swagger';
import { UpdateSectionDto } from './update-section.dto';
import { IsUUID } from 'class-validator';

export class CreateSectionDto extends UpdateSectionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  examId: string;
}
