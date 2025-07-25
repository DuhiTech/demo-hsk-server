import { Injectable } from '@nestjs/common';
import { ClerkUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { clerkClient } from '@clerk/express';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateUser({ data }: ClerkUserDto) {
    const user = await this.prisma.user.upsert({
      where: { clerkUserId: data.id },
      create: {
        clerkUserId: data.id,
        email: data.email_addresses[0]?.email_address || '',
        name: `${data.first_name} ${data.last_name}`.trim(),
        image: data.image_url,
        role: 'Student',
      },
      update: {
        email: data.email_addresses[0]?.email_address || '',
        name: `${data.first_name} ${data.last_name}`.trim(),
        image: data.image_url,
      },
    });

    await clerkClient.users.updateUserMetadata(user.clerkUserId, {
      publicMetadata: {
        role: user.role,
      },
    });

    return user;
  }
}
