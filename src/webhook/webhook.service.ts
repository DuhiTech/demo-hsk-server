import { Injectable } from '@nestjs/common';
import { UserCreatedDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async createUser({ data }: UserCreatedDto) {
    const user = await this.prisma.user.create({
      data: {
        clerkUserId: data.id,
        email: data.email_addresses[0]?.email_address,
        name: `${data.first_name} ${data.last_name}`.trim(),
        role: 'Student',
      },
    });

    return user;
  }
}
