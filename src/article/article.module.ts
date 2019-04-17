import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
})
export class ArticleModule {}
