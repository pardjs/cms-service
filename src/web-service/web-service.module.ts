import { Module } from '@nestjs/common';
import { PardjsUsersServiceSdkModule } from '@pardjs/users-service-sdk';
import { AliCloudOssModule } from '../ali-cloud-oss/ali-cloud-oss.module';
import { ArticleContentModule } from '../article-content/article-content.module';
import { ArticleModule } from '../article/article.module';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { ClientUploadActivityModule } from './../client-upload-activity/client-upload-activity.module';
import { ArticleController } from './article.controller';
import { ArticleApiService } from './article.service';
import { CategoryController } from './category.controller';
import { TagController } from './tag.controller';
import { WebServiceController } from './web-service.controller';
import { WebServiceService } from './web-service.service';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    ArticleContentModule,
    TagModule,
    PardjsUsersServiceSdkModule,
    AliCloudOssModule,
    ClientUploadActivityModule,
  ],
  providers: [WebServiceService, ArticleApiService],
  controllers: [
    WebServiceController,
    ArticleController,
    CategoryController,
    TagController,
  ],
})
export class WebServiceModule {}
