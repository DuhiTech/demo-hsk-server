import { ApiProperty } from '@nestjs/swagger';

export class PageDto<T> {
  @ApiProperty({ example: [], isArray: true })
  items!: T[];

  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;
}
