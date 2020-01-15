import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpsertArticleDto {
  @ApiPropertyOptional({ example: 'article-alias' })
  @IsString()
  @IsOptional()
  aliasPath: string;

  @ApiProperty({ example: '测试文章' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '文章描述 \n 描述文章' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '文章内容，是一大段。' })
  @IsString()
  content: string;

  @ApiProperty({ example: '/images/000-111-0000.jpg' })
  @IsString()
  coverImageUrl: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  categoryId: number;

  @ApiPropertyOptional({
    type: Number,
    isArray: true,
    example: [1, 2, 3],
  })
  @IsArray({})
  @IsOptional()
  tagIds: number[];
}
