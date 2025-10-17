import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PageDto, PaginationQueryDto } from 'src/common/dto';
import { UserDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { Role } from 'types/enums';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Lấy người dùng' })
  @ApiResponse({ status: 200, type: PageDto<UserDto> })
  @Roles(Role.Admin)
  @Get()
  getUsers(@Query() query: PaginationQueryDto<UserDto>) {
    return this.userService.getUsers(query);
  }
}
