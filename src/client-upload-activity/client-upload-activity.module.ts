import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUploadActivityService } from './client-upload-activity.service';
import { ClientUploadCallback } from './client-upload-callback.entity';
import { ClientUploadRequest } from './client-upload-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientUploadCallback, ClientUploadRequest])],
  providers: [ClientUploadActivityService],
  exports: [ClientUploadActivityService],
})
export class ClientUploadActivityModule {}
