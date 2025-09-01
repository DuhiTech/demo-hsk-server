import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, WebhookModule, ExamModule],
  controllers: [AppController],
  providers: [{ provide: 'APP_GUARD', useClass: RolesGuard }]
})
export class AppModule {}
