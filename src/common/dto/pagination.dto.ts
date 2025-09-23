import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class PaginationQueryDto<T> {
  @ApiProperty({ example: 1, minimum: 1, default: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Số trang phải lớn hớn hoặc bằng 1' })
  page?: number = 1;

  @ApiProperty({ example: 10, minimum: 1, default: 10, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 'updatedAt', type: 'string', required: false })
  @IsOptional()
  @IsString()
  sortBy?: keyof T;

  @ApiProperty({ example: 'asc', enum: ['asc', 'desc'], required: false })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
