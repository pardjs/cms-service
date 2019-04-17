import { Content } from '../content/content.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { EntityParent } from '@pardjs/common';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

@Entity('Article')
export class Article extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aliasPath: string;

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

  @ManyToOne(type => Category, category => category.articles)
  @JoinColumn({name: 'category_id'})
  category: Category;

  @ManyToMany(type => Tag, tag => tag.articles, { cascade: false })
  @JoinTable({name: 'Article_Tag_Link'})
  tags: Tag[];
}
