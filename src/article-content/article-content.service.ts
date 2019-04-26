import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleContent } from './article-content.entity';

@Injectable()
export class ArticleContentService {
  constructor(
    @InjectRepository(ArticleContent)
    private readonly repository: Repository<ArticleContent>,
  ) {}

  async create(articleId: number, content: string) {
    await this.repository.insert({ articleId, content });
    return this.getLatest(articleId);
  }

  async getLatest(articleId: number) {
    return this.repository.findOne({
      where: { articleId },
      order: { id: 'DESC' },
    });
  }

  async removeByArticle(articleId: number) {
    const entities = await this.repository.find({ where: { articleId } });
    return this.repository.remove(entities);
  }
}
