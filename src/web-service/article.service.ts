import { Injectable } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { TagService } from '../tag/tag.service';

@Injectable()
export class ArticleApiService {
  constructor(
    private articleService: ArticleService,
    private readonly tagService: TagService,
  ) {}
}
