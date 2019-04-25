import { ApiModelProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../category/dto/category-response.dto';
import { TagResponseDto } from '../../tag/dto/tag-response.dto';

export class ArticleResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({ example: 'article-alias' })
  aliasPath: string;

  @ApiModelProperty({ example: '测试文章' })
  title: string;

  @ApiModelProperty({ example: '文章描述 \n 描述文章' })
  description?: string;

  @ApiModelProperty({ example: '文章内容，是一大段。' })
  content: string;

  @ApiModelProperty({ example: '/images/000-111-0000.jpg' })
  coverImageUrl: string;

  @ApiModelProperty({})
  category: CategoryResponseDto;

  @ApiModelProperty({})
  tags: TagResponseDto[];

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  updatedAt: string;
}
