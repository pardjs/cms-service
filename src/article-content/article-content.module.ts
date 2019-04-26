import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleContent } from './article-content.entity';
import { ArticleContentService } from './article-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleContent])],
  providers: [ArticleContentService],
  exports: [ArticleContentService],
})
export class ArticleContentModule {}
