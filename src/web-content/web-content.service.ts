import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WebContent } from '.';

@Injectable()
export class WebContentService {
  constructor(
    @InjectRepository(WebContent)
    private readonly repository: Repository<WebContent>,
  ) {}

  create(name: string, content: object): object {
    return this.repository.save({
      name,
      content,
    });
  }

  findOne(name: string): object {
    return this.repository.findOne({ name });
  }

  async replaceOne(name: string, content: object): Promise<object> {
    await this.repository.update(name, { name, content });
    return this.repository.findOne(name);
  }

  async publishToOss(
    name: string,
    bucketName: string,
    path: string,
  ): Promise<void> {
    return;
  }
}
