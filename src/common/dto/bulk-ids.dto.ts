import { ApiProperty } from '@nestjs/swagger';

export class BulkIdsDto {
  @ApiProperty({ example: [], isArray: true })
  ids!: string[];
}
