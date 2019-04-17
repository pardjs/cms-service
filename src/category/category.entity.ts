import { Article } from './../article/article.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityParent } from '@pardjs/common';

@Entity('Category')
export class Category extends EntityParent {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  name: string;

  @OneToMany(type => Article, article => article.category)
  articles: Article[];
}
