import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Trycore EVM API')
    .setDescription(
      'REST API for project and activity management with Earned Value Management metrics.',
    )
    .setVersion('1.0')
    .addTag('projects', 'Project management and consolidated EVM metrics')
    .addTag('activities', 'Activity management and individual EVM metrics')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();