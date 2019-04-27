import { ApiModelProperty } from '@nestjs/swagger';
import { OssPutResponseDto } from '../../ali-cloud-oss/oss-put-response.dto';

export class PublishArticleResponseDto {
  @ApiModelProperty({ type: OssPutResponseDto })
  article: OssPutResponseDto;
}
