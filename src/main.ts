import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppLogger } from './logger/logger.service';
import { AppExceptionsFilter } from './exception/exception.filter';

const PORT = env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  const logger = new AppLogger();
  app.useLogger(logger);

  const httpAdapter = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter, logger));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
