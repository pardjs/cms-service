import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertArticleDto {
    @ApiModelProperty({example: 'article-alias'})
    @IsString()
    aliasPath: string;

    @ApiModelProperty({example: '测试文章'})
    @IsString()
    title: string;

    @ApiModelProperty({example: '文章描述 \n 描述文章'})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty({example: '文章内容，是一大段。'})
    @IsString()
    content: string;

    @ApiModelProperty({example: '/images/000-111-0000.jpg'})
    @IsString()
    coverImageUrl: string;

    @ApiModelProperty({example: 1})
    @IsInt()
    categoryId: number;

    @ApiModelProperty({
        type: Number,
        isArray: true,
        example: [1, 2, 3],
    })
    @IsArray({})
    @IsOptional()
    tagIds: number[];
}
