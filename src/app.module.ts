import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { WebContentModule } from './web-content';
import { WebServiceModule } from './web-service/web-service.module';

@Module({
  imports: [TypeOrmModule.forRoot(), WebServiceModule, WebContentModule],
  controllers: [AppController],
})
export class AppModule {}
