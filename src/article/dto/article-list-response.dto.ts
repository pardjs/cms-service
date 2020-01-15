import { ApiProperty } from '@nestjs/swagger';
import { ArticleResponseDto } from './article-response.dto';

export class ArticleListResponseDto {
  @ApiProperty({
    type: ArticleResponseDto,
    isArray: true,
  })
  data: ArticleResponseDto[];

  @ApiProperty()
  count: number;
}
