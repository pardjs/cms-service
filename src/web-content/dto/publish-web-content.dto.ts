import { ApiModelProperty } from '@nestjs/swagger';

export class PublishWebContentDto {
  @ApiModelProperty({
    description: '要发布文件到 OSS 的bucket名称',
    example: 'dozto-cdn',
  })
  readonly bucket: string;

  @ApiModelProperty({
    description: '要发布文件到OSS的路径',
    example: '/release/dozto.com/constant/zh-cn.json',
  })
  readonly path: string;
}
