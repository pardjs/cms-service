import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  corsOptions,
  HttpExceptionFilter,
  logger,
  ValidationPipe,
} from '@pardjs/common';
import { AppModule } from './app.module';
import { PORT, SERVICE_BASE } from './constants';

// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('Pardjs CMS Service')
    .setDescription('The Pardjs CMS Service API description')
    .setVersion(version)
    .addTag('cats')
    .setBasePath(SERVICE_BASE + '/api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const apiDocPath = 'api-doc';
  SwaggerModule.setup(apiDocPath, app, document);
  await app.listen(PORT);
  logger.info(`service started at ${PORT}`);
  logger.info(`find api doc at http://0.0.0.0:${PORT}/${apiDocPath}`);
}
bootstrap();
