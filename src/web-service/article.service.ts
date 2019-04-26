import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { AliCloudOssService } from '../ali-cloud-oss/ali-cloud-oss.service';
import { ArticleContent } from '../article-content/article-content.entity';
import { ArticleContentService } from '../article-content/article-content.service';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { ArticleListResponseDto } from '../article/dto/article-list-response.dto';
import { ArticleResponseDto } from '../article/dto/article-response.dto';
import { PublishArticleResponseDto } from '../article/dto/publish-article-response.dto';
import { UpsertArticleDto } from '../article/dto/upsert-article.dto';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Injectable()
export class ArticleApiService {
  constructor(
    private readonly aliCloudOssService: AliCloudOssService,
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService,
    private readonly contentService: ArticleContentService,
    private readonly tagService: TagService,
  ) {}

  async create(data: UpsertArticleDto, userId: number) {
    const newArticle = this.articleService.getNewInstance();
    newArticle.aliasPath = data.aliasPath;
    newArticle.categoryId = data.categoryId;
    newArticle.coverImageUrl = data.coverImageUrl;
    newArticle.description = data.description;
    newArticle.title = data.title;
    newArticle.createdByUserId = userId;
    if (data.tagIds && data.tagIds.length > 0) {
      newArticle.tags = await this.tagService.find({
        where: { id: In(data.tagIds) },
      });
    }
    const savedArticle = await this.articleService.save(newArticle);
    const content = await this.contentService.create(
      savedArticle.id,
      data.content,
    );
    const category = await this.categoryService.findOne({
      where: { id: savedArticle.categoryId },
    });
    return this.toResponse(savedArticle, category, content, savedArticle.tags);
  }

  toResponse(
    article: Article,
    category: Category,
    content: ArticleContent,
    tags: Tag[],
  ): ArticleResponseDto {
    return {
      id: article.id,
      aliasPath: article.aliasPath,
      title: article.title,
      content: content.content,
      coverImageUrl: article.coverImageUrl,
      category: { id: category.id, name: category.name },
      tags: tags.map(tag => ({ id: tag.id, name: tag.name })),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
  }

  async publish() {
    const { data: articles } = await this.find();
    for (const article of articles) {
      await this.publishOne(article.id);
    }
    return this.aliCloudOssService.saveText(
      `articles/index.json`,
      JSON.stringify(
        articles.map(article => {
          return {
            key: article.aliasPath || article.id,
            category: article.category,
            tags: article.tags,
            title: article.title,
            description: article.description,
          };
        }),
      ),
    );
  }

  async publishOne(id: number): Promise<PublishArticleResponseDto> {
    const article = await this.findOne(id);
    const content = article.content;
    article.content = `articles/${article.aliasPath ||
      article.id}-content.html`;
    const resContent = await this.aliCloudOssService.saveText(
      article.content,
      content,
    );
    article.content = resContent.name;
    const resArticle = await this.aliCloudOssService.saveText(
      `articles/${article.aliasPath || article.id}.json`,
      JSON.stringify(article),
    );
    return { article: resArticle, content: resContent };
  }

  async find(skip?: number, take?: number): Promise<ArticleListResponseDto> {
    const articles = await this.articleService.find({
      skip,
      take,
      select: ['id'],
    });
    const count = await this.articleService.count();
    const articleIds = articles.map(({ id }) => id);
    const data: ArticleResponseDto[] = [];
    for (const articleId of articleIds) {
      const item = await this.findOne(articleId);
      data.push(item);
    }
    return { data, count };
  }

  async updateOne(id: number, data: UpsertArticleDto, userId: number) {
    const article = await this.articleService.findOne(id);
    if (!article) {
      throw new BadRequestException('article not found');
    }
    article.aliasPath = data.aliasPath || article.aliasPath;
    article.categoryId = data.categoryId || article.categoryId;
    article.coverImageUrl = data.coverImageUrl || article.coverImageUrl;
    article.description = data.description || article.description;
    article.title = data.title || article.title;
    article.updatedByUserId = userId;
    if (data.tagIds && data.tagIds.length > 0) {
      article.tags = await this.tagService.find({
        where: { id: In(data.tagIds) },
      });
    }
    const savedArticle = await this.articleService.save(article);
    let content: ArticleContent;
    if (data.content) {
      content = await this.contentService.create(savedArticle.id, data.content);
    } else {
      content = await this.contentService.getLatest(article.id);
    }
    const category = await this.categoryService.findOne({
      where: { id: savedArticle.categoryId },
    });
    return this.toResponse(savedArticle, category, content, savedArticle.tags);
  }
  remove(id: number) {
    return this.articleService.remove(id);
  }
  async findOne(id: number) {
    const article = await this.articleService.findOne(id);
    if (!article) {
      throw new BadRequestException('article not found');
    }
    const category = article.category;
    const tags = article.tags;
    const content = await this.contentService.getLatest(article.id);
    return this.toResponse(article, category, content, tags);
  }
}
