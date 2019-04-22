import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  count() {
    return this.repository.count();
  }
  constructor(@InjectRepository(Article) private readonly repository: Repository<Article>) {}
  getNewInstance() {
    return this.repository.create();
  }

  save(article: Article) {
    return this.repository.save(article);
  }

  find(options?: FindManyOptions<Article>) {
    return this.repository.find(options);
  }

  findOne(id: number) {
    return this.repository.findOne(id, {
      join: {
        alias: 'article',
        leftJoin: {
          category: 'article.category',
          tags: 'article.tags',
        },
      },
    });
  }
  remove(id: number) {
    return this.repository.delete(id);
  }
}
