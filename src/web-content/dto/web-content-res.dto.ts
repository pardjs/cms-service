import { ApiResponseModelProperty } from '@nestjs/swagger';

export class WebContentResDto {
  @ApiResponseModelProperty({
    example: 'website-config',
  })
  readonly key: string;

  @ApiResponseModelProperty({
    example: {
      header: {
        title: '网站header标题',
        subTitle: '网站header副标题',
      },
    },
  })
  readonly value: object;
}
