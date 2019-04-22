import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async findOrCreate(name: string): Promise<Category> {
    const category = await this.repository.findOne({where: { name }});
    if (category) {
      return category;
    }
    await this.repository.insert({ name });
    return this.findOrCreate(name);
  }

  async find(options?: FindManyOptions<Category>) {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<Category>) {
    return this.repository.findOne(options);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  save(category: Category) {
    return this.repository.save(category);
  }
}
