import { Module } from '@nestjs/common';
import { PardjsUsersServiceSdkModule } from '@pardjs/users-service-sdk';
import { ArticleModule } from '../article/article.module';
import { CategoryModule } from '../category/category.module';
import { ContentModule } from '../content/content.module';
import { TagModule } from '../tag/tag.module';
import { ArticleController } from './article.controller';
import { ArticleApiService } from './article.service';
import { CategoryController } from './category.controller';
import { TagController } from './tag.controller';
import { WebServiceService } from './web-service.service';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    ContentModule,
    TagModule,
    PardjsUsersServiceSdkModule,
  ],
  providers: [WebServiceService, ArticleApiService],
  controllers: [
    ArticleController,
    CategoryController,
    TagController,
  ],
})
export class WebServiceModule {

}
