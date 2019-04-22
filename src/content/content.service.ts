import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';

@Injectable()
export class ContentService {
  
  constructor(
    @InjectRepository(Content)
    private readonly repository: Repository<Content>,
  ) {}

  async create(articleId: number, content: string) {
    await this.repository.insert({articleId, content});
    return this.getLatest(articleId);
  }

  async getLatest(articleId: number) {
    return this.repository.findOne({where: {articleId}, order: {id: 'DESC'}});
  }
}
