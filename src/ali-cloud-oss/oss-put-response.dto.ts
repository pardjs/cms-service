import { ApiProperty } from '@nestjs/swagger';

export class OssPutResponseDto {
  @ApiProperty({
    example: 'pardjs/web-contents/website-config/1556249482346.json',
  })
  name: string;

  @ApiProperty({
    description: '发布到OSS的完整 URL',
    example:
      'http://pardjs-cms-service.oss-cn-shanghai.aliyuncs.com/pardjs/web-contents/website-config/1556249482346.json',
  })
  url: string;
}
