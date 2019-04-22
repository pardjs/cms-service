import { Module } from '@nestjs/common';
import { AliCloudOssService } from './ali-cloud-oss.service';

@Module({
  providers: [AliCloudOssService],
  exports: [AliCloudOssService],
})
export class AliCloudOssModule {

}
