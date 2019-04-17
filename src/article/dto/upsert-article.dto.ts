import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsArray } from 'class-validator';

export class UpsertArticleDto {
    @ApiModelProperty()
    @IsString()
    aliasPath: string;

    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty()
    @IsString()
    content: string;

    @ApiModelProperty()
    @IsString()
    coverImageUrl: string;

    @ApiModelProperty()
    @IsInt()
    categoryId: number;

    @ApiModelProperty()
    @IsArray()
    @IsOptional()
    tagIds: number[];
}
