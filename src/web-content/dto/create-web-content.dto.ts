import { ApiProperty } from '@nestjs/swagger';

export class CreateWebContentDto {
  @ApiProperty({
    description: '内容的唯一标示，如文件名或其他字段。',
    example: 'website-config',
  })
  readonly key: string;

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
