import { EntityParent } from '@pardjs/common';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity('Content')
export class Content extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  content: string;

  @ManyToOne(type => Article, article => article.contentVersions)
  @JoinColumn({name: 'article_id'})
  article: Article;

  @Column({name: 'article_id'})
  articleId: number;
}
