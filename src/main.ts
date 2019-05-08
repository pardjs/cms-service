import { config } from 'dotenv';
config();

import * as Sentry from '@sentry/node';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    serverName: 'pardjs-cms-service',
  });
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  corsOptions,
  HttpExceptionFilter,
  logger,
  ValidationPipe,
} from '@pardjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PORT, SERVICE_BASE } from './constants';

// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('Pardjs CMS Service')
    .setDescription('The Pardjs CMS Service API description')
    .setVersion(version)
    .addTag('cats')
    .setBasePath(SERVICE_BASE + '/api')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    SERVICE_BASE + (SERVICE_BASE ? '-' : '/') + 'api-doc',
    app,
    doc,
  );
  await app.listen(PORT);
  logger.info(`service started at ${PORT}`);
}
bootstrap();
