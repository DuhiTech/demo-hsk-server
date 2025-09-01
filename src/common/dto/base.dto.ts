import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID(4)
  id!: string;
}

export class BaseDto extends IdDto {
  @ApiProperty({ example: new Date().toISOString() })
  @Type(() => Date)
  @IsDate()
  createdAt!: Date;

  @ApiProperty({ example: new Date().toISOString() })
  @Type(() => Date)
  @IsDate()
  updatedAt!: Date;
}
