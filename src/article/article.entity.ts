import { EntityParent } from '@pardjs/common';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Category } from '../category/category.entity';
import { Content } from '../content/content.entity';
import { Tag } from '../tag/tag.entity';

@Entity('Article')
export class Article extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-article-aliasPath', {sparse: true, unique: true})
  @Column({nullable: true})
  aliasPath?: string;

  @Column()
  title: string;

  @Column({nullable: true})
  description?: string;

  @OneToMany(type => Content, content => content.article)
  contentVersions: Content[];

  @Column()
  coverImageUrl: string;

  @Column({type: 'boolean', default: false})
  isPublished: boolean;

  @ManyToOne(type => Category, category => category.articles, {cascade: false, eager: true})
  @JoinColumn({name: 'category_id'})
  category: Category;

  @Column({name: 'category_id'})
  categoryId: number;

  @ManyToMany(type => Tag, tag => tag.articles, { cascade: false, eager: true })
  @JoinTable({name: 'Article_Tag_Link'})
  tags: Tag[];

  @Column()
  createdByUserId: number;

  @Column({nullable: true})
  updatedByUserId?: number;
}
