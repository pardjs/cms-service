import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PardjsUsersServiceSdkModule } from '@pardjs/users-service-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebServiceModule } from './web-service/web-service.module';

@Module({
  imports: [TypeOrmModule.forRoot(), WebServiceModule, PardjsUsersServiceSdkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
