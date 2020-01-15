import { ApiProperty } from '@nestjs/swagger';

export class ReplaceWebContentDto {
  @ApiProperty({
    description: '要保存的json内容',
    example: {
      header: {
        title: '网站header标题',
        subTitle: '网站header副标题',
      },
    },
  })
  readonly value: object;
}
