import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { Article } from 'src/article/article.entity';
import { FindManyOptions } from 'typeorm';
import { UpsertArticleDto } from '../article/dto/upsert-article.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';

@Controller('articles')
@ApiUseTags('Article')
export class ArticleController {
    constructor() {}

    @AuthPointName(CMSAuthPointsNames.CREATE_ARTICLE)
    @Post('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    create(@Body() data: UpsertArticleDto) {}

    @AuthPointName(CMSAuthPointsNames.PUBLISH)
    @Post('actions/publish')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    publish() {}

    @AuthPointName(CMSAuthPointsNames.PUBLISH_ARTICLE)
    @Post(':id/actions/publish')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    publishOne(@Param('id') id: number) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ARTICLES)
    @Get('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    find(@Query() query: FindManyOptions<Article>) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_ARTICLE)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: number) {
        // TODO: validate id in dto
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_ARTICLE)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_ARTICLE)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    update(@Param('id') id: number, @Body() data: UpsertArticleDto) {
    }
}
