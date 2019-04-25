import { ApiModelProperty } from '@nestjs/swagger';

export class OssPutResponseDto {
  @ApiModelProperty({
    example: '/articles/001.json',
  })
  name: string;
}
