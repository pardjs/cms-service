import { EntityParent } from '@pardjs/common';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity('Category')
export class Category extends EntityParent {

  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-category-name-unique', { unique: true })
  @Column()
  name: string;

  @OneToMany(type => Article, article => article.category)
  articles: Article[];
}
