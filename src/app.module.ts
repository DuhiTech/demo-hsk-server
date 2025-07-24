import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [AuthModule, PrismaModule, WebhookModule],
  controllers: [AppController],
})
export class AppModule {}
