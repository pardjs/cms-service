import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async findOrCreate(name: string): Promise<Tag> {
    const tag = await this.repository.findOne({where: { name }});
    if (tag) {
      return tag;
    }
    await this.repository.insert({ name });
    return this.findOrCreate(name);
  }

  async find(options?: FindManyOptions<Tag>) {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<Tag>) {
    return this.repository.findOne(options);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  save(tag: Tag) {
    return this.repository.save(tag);
  }
}
