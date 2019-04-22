import { EntityParent } from '@pardjs/common';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity('Tag')
export class Tag extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-tag-name-unique', { unique: true })
  @Column()
  name: string;

  @ManyToMany(type => Article, article => article.tags)
  articles: Article[];
}
