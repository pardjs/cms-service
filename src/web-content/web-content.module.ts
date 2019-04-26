import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WebContent, WebContentService } from '.';
import { AliCloudOssModule } from '../ali-cloud-oss/ali-cloud-oss.module';

@Module({
  imports: [TypeOrmModule.forFeature([WebContent]), AliCloudOssModule],
  providers: [WebContentService],
  exports: [WebContentService],
})
export class WebContentModule {}
