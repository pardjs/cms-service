import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../category/dto/category-response.dto';
import { TagResponseDto } from '../../tag/dto/tag-response.dto';

export class ArticleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'article-alias' })
  aliasPath: string;

  @ApiProperty({ example: '测试文章' })
  title: string;

  @ApiProperty({ example: '文章描述 \n 描述文章' })
  description?: string;

  @ApiProperty({ example: '文章内容，是一大段。' })
  content: string;

  @ApiProperty({
    example:
      'http://pardjs-cms-service.oss-cn-shanghai.aliyuncs.com/pardjs/articles/001/1556250410312.json',
  })
  publishedUrl: string;

  @ApiProperty({ example: '/images/000-111-0000.jpg' })
  coverImageUrl: string;

  @ApiPropertyOptional({ type: CategoryResponseDto })
  category?: CategoryResponseDto;

  @ApiProperty({ type: TagResponseDto, isArray: true })
  tags: TagResponseDto[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  publishedAt: string;

  @ApiProperty()
  updatedAt: string;
}
