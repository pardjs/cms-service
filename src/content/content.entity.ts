import { Article } from '../article/article.entity';
import { EntityParent } from '@pardjs/common';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('Content')
export class Content extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  content: string;

  @ManyToOne(type => Article, article => article.contentVersions)
  @JoinColumn({name: 'article_id'})
  article: Article;
}
