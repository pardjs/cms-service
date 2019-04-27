import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertArticleDto {
    @ApiModelPropertyOptional({example: 'article-alias'})
    @IsString()
    @IsOptional()
    aliasPath: string;

    @ApiModelProperty({example: '测试文章'})
    @IsString()
    title: string;

    @ApiModelPropertyOptional({example: '文章描述 \n 描述文章'})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty({example: '文章内容，是一大段。'})
    @IsString()
    content: string;

    @ApiModelProperty({example: '/images/000-111-0000.jpg'})
    @IsString()
    coverImageUrl: string;

    @ApiModelPropertyOptional({example: 1})
    @IsInt()
    @IsOptional()
    categoryId: number;

    @ApiModelPropertyOptional({
        type: Number,
        isArray: true,
        example: [1, 2, 3],
    })
    @IsArray({})
    @IsOptional()
    tagIds: number[];
}
