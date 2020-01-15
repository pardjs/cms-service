import { ApiProperty } from '@nestjs/swagger';

export class WebContentResDto {
  @ApiProperty({
    example: 'website-config',
  })
  readonly key: string;

  @ApiProperty({
    example: {
      header: {
        title: '网站header标题',
        subTitle: '网站header副标题',
      },
    },
  })
  readonly value: object;
}
