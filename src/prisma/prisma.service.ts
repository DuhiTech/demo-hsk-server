import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://hsk_owner:npg_Uk6EnhBlAQ8e@ep-plain-shadow-a1wumx0p-pooler.ap-southeast-1.aws.neon.tech/demo-hsk?sslmode=require&channel_binding=require',
        },
      },
    });
  }
}
