import { ApiResponseModelProperty } from '@nestjs/swagger';

export class WebContentResDto {
  @ApiResponseModelProperty({
    example: 'zh-cn.json',
  })
  readonly name: string;

  @ApiResponseModelProperty({
    example: {
      header: {
        title: '网站header标题',
        subTitle: '网站header副标题',
      },
    },
  })
  readonly content: object;
}
