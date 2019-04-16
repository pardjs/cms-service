import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT } from './constants';
import {
  logger,
  corsOptions,
  ValidationPipe,
  HttpExceptionFilter,
} from '@pardjs/common';
// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('Pardjs CMS Service')
    .setDescription('The Pardjs CMS Service API description')
    .setVersion(version)
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const apiDocPath = 'api-doc';
  SwaggerModule.setup(apiDocPath, app, document);
  await app.listen(PORT);
  logger.info(`service started at ${PORT}`);
  logger.info(`find api doc at http://0.0.0.0:${PORT}/${apiDocPath}`);
}
bootstrap();
