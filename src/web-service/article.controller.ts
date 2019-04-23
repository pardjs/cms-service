import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName, UserResponse } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { Article } from 'src/article/article.entity';
import { FindManyOptions } from 'typeorm';
import { UpsertArticleDto } from '../article/dto/upsert-article.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { ArticleApiService } from './article.service';

@Controller('articles')
@ApiUseTags('Article')
export class ArticleController {
    constructor(private articleApiService: ArticleApiService) {}

    @AuthPointName(CMSAuthPointsNames.CREATE_ARTICLE)
    @Post('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    create(@Body() data: UpsertArticleDto, @Request() req: any) {
        const user = req.user as UserResponse;
        return this.articleApiService.create(data, user.id);
    }

    @AuthPointName(CMSAuthPointsNames.PUBLISH)
    @Post('actions/publish')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    publish() {
        return this.articleApiService.publish();
    }

    @AuthPointName(CMSAuthPointsNames.PUBLISH_ARTICLE)
    @Post(':id/actions/publish')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    publishOne(@Param('id') id: number) {
        return this.articleApiService.publishOne(id);
    }

    @AuthPointName(CMSAuthPointsNames.FIND_ARTICLES)
    @Get('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    find(@Query() query: FindManyOptions<Article>) {
        return this.articleApiService.find();
    }

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_ARTICLE)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: number) {
        return this.articleApiService.findOne(id);
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_ARTICLE)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
        return this.articleApiService.remove(id);
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_ARTICLE)
    @Put(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    update(@Param('id') id: number, @Body() data: UpsertArticleDto, @Request() req: any) {
        const user = req.user as UserResponse;
        return this.articleApiService.updateOne(id, data, user.id);
    }
}
