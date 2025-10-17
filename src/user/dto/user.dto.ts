import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { BaseDto } from 'src/common/dto';
import { Role } from 'types/enums';

export class UserDto extends BaseDto {
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @ApiProperty({ example: 'Name' })
  name: string;

  @ApiProperty({ type: 'string', required: false })
  image?: string | null;

  @ApiProperty({ example: Role.Student, enum: Role })
  role: UserRole;
}
