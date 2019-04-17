import { ContentModule } from '../content/content.module';
import { CategoryModule } from '../category/category.module';
import { ArticleModule } from '../article/article.module';
import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [ArticleModule, CategoryModule, ContentModule, TagModule]
})
export class WebServiceModule {

}
