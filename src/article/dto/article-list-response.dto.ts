import { ApiModelProperty } from '@nestjs/swagger';
import { ArticleResponseDto } from './article-response.dto';

export class ArticleListResponseDto {
  @ApiModelProperty()
  data: ArticleResponseDto[];

  @ApiModelProperty()
  count: number;
}
