import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { validate } from './env.validation';
import { SectionModule } from './section/section.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), AuthModule, PrismaModule, WebhookModule, ExamModule, SectionModule, QuestionModule],
  controllers: [AppController],
  providers: [{ provide: 'APP_GUARD', useClass: RolesGuard }],
})
export class AppModule {}
