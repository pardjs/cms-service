import { EntityParent } from '@pardjs/common';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { ArticleContent } from './../article-content/article-content.entity';

@Entity('Article')
export class Article extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-article-aliasPath', { sparse: true, unique: true })
  @Column({ nullable: true })
  aliasPath?: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(type => ArticleContent, content => content.article)
  contentVersions: ArticleContent[];

  @Column()
  coverImageUrl: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  publishedUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ManyToOne(type => Category, category => category.articles, {
    cascade: false,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @ManyToMany(type => Tag, tag => tag.articles, { cascade: false, eager: true })
  @JoinTable({ name: 'Article_Tag_Link' })
  tags: Tag[];

  @Column()
  createdByUserId: number;

  @Column({ nullable: true })
  updatedByUserId?: number;
}
