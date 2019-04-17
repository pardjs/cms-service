import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { Article } from 'src/article/article.entity';
import { FindManyOptions } from 'typeorm';
import { UpsertArticleDto } from '../article/dto/upsert-article.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';

@Controller('articles')
export class ArticleController {
    constructor() {}

    @AuthPointName(CMSAuthPointsNames.CREATE_ARTICLE)
    @Post('')
    @UseGuards(AirRolesGuard)
    create(@Body() data: UpsertArticleDto) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ARTICLES)
    @Get('')
    @UseGuards(AirRolesGuard)
    find(@Query() query: FindManyOptions<Article>) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_ARTICLE)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    findOne(@Param('id') id: number) {
        // TODO: validate id in dto
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_ARTICLE)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    remove(@Param('id') id: number) {
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_ARTICLE)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    update(@Param('id') id: number, @Body() data: UpsertArticleDto) {
    }
}
