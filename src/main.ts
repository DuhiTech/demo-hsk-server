import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { clerkAuthMiddleware } from './auth/middlewares/clerk-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.use(clerkAuthMiddleware)

  const prefix = '/api/v1';
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle('HSK Demo API')
    .setDescription('API for testing HSK')
    .setVersion('1.0')
    .addServer(prefix)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('swagger/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 5000);

  // eslint-disable-next-line no-console
  console.log(`Swagger is running on http://localhost:${process.env.PORT ?? 5000}/swagger/docs`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
