import { ApiModelProperty } from '@nestjs/swagger';
import { ArticleResponseDto } from './article-response.dto';

export class ArticleListResponseDto {
  @ApiModelProperty({
    type: ArticleResponseDto,
    isArray: true,
  })
  data: ArticleResponseDto[];

  @ApiModelProperty()
  count: number;
}
