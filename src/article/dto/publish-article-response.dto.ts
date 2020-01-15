import { ApiProperty } from '@nestjs/swagger';
import { OssPutResponseDto } from '../../ali-cloud-oss/oss-put-response.dto';

export class PublishArticleResponseDto {
  @ApiProperty({ type: OssPutResponseDto })
  article: OssPutResponseDto;
}
