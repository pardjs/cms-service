import { Article } from './../article/article.entity';
import { EntityParent } from '@pardjs/common';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('Tag')
export class Tag extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Article, article => article.tags)
  articles: Article[];
}
