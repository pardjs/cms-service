import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERRORS } from './web-content.errors';

import { WebContent } from '.';
import { AliCloudOssService } from '../ali-cloud-oss/ali-cloud-oss.service';

@Injectable()
export class WebContentService {
  constructor(
    @InjectRepository(WebContent)
    private readonly repository: Repository<WebContent>,
    private readonly ossService: AliCloudOssService,
  ) {}

  async create(key: string, value: object) {
    const newEntity = this.repository.create({
      key,
      value,
      isPublished: false,
    });
    const saved = await this.repository.save(newEntity);
    return saved;
  }

  async findOne(key: string) {
    const found = await this.repository.findOne({ key });
    if (!found) {
      throw ERRORS.UNKNOWN_KEY;
    }
    return found;
  }

  async upsert(key: string, value: object) {
    const found = await this.repository.findOne({ key });
    if (!found) {
      return this.create(key, value);
    } else {
      return this.replaceOne(key, value);
    }
  }

  async replaceOne(key: string, value: object) {
    await this.repository.update(
      { key },
      { value, updatedSinceLastPublish: true },
    );
    return this.repository.findOne(key);
  }

  async publishToOss(key: string) {
    const webContent = await this.findOne(key);
    const putResult = await this.ossService.saveText(
      `web-contents/${key}.json`,
      JSON.stringify(webContent.value),
    );
    Logger.verbose(putResult);
    webContent.isPublished = true;
    webContent.publishedUrl = putResult.url;
    webContent.updatedSinceLastPublish = false;
    return this.repository.save(webContent);
  }

  keys() {
    return this.repository.find({ select: ['key'] });
  }
}
