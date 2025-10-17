import { Injectable } from '@nestjs/common';
import { PageDto, PaginationQueryDto } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: PaginationQueryDto<UserDto>): Promise<PageDto<UserDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      AND: [
        // baseWhere,
        query.search
          ? {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const orderBy: Prisma.UserOrderByWithRelationInput | undefined = query.sortBy
      ? { [query.sortBy]: query.order ?? 'asc' }
      : undefined;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items,
      limit,
      page,
      total,
    };
  }
}
