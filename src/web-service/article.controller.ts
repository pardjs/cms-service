import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName, UserResponse } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { ArticleListResponseDto } from '../article/dto/article-list-response.dto';
import { DeleteResult } from 'typeorm';
import { OssPutResponseDto } from '../ali-cloud-oss/oss-put-response.dto';
import { UpsertArticleDto } from '../article/dto/upsert-article.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { ArticleResponseDto } from './../article/dto/article-response.dto';
import { PublishArticleResponseDto } from './../article/dto/publish-article-response.dto';
import { ArticleApiService } from './article.service';

@Controller('articles')
@ApiUseTags('Article')
export class ArticleController {
  constructor(private articleApiService: ArticleApiService) {}

  @AuthPointName(CMSAuthPointsNames.CREATE_ARTICLE)
  @Post('')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ArticleResponseDto,
  })
  create(@Body() data: UpsertArticleDto, @Request() req: any) {
    const user = req.user as UserResponse;
    return this.articleApiService.create(data, user.id);
  }

  @AuthPointName(CMSAuthPointsNames.PUBLISH)
  @Post('actions/publish')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OssPutResponseDto,
  })
  publish() {
    return this.articleApiService.publish();
  }

  @AuthPointName(CMSAuthPointsNames.PUBLISH_ARTICLE)
  @Post(':id/actions/publish')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PublishArticleResponseDto,
  })
  publishOne(@Param('id') id: number) {
    return this.articleApiService.publishOne(id);
  }

  @AuthPointName(CMSAuthPointsNames.FIND_ARTICLES)
  @Get('')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ArticleListResponseDto,
  })
  find(@Query('limit') take: number, @Query('skip') skip: number) {
    return this.articleApiService.find(take, skip);
  }

  @AuthPointName(CMSAuthPointsNames.FIND_ONE_ARTICLE)
  @Get(':id')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ArticleResponseDto,
  })
  findOne(@Param('id') id: number) {
    return this.articleApiService.findOne(id);
  }

  @AuthPointName(CMSAuthPointsNames.REMOVE_ARTICLE)
  @Delete(':id')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteResult,
  })
  remove(@Param('id') id: number) {
    return this.articleApiService.remove(id);
  }

  @AuthPointName(CMSAuthPointsNames.UPDATE_ARTICLE)
  @Put(':id')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ArticleResponseDto,
  })
  update(
    @Param('id') id: number,
    @Body() data: UpsertArticleDto,
    @Request() req: any,
  ) {
    const user = req.user as UserResponse;
    return this.articleApiService.updateOne(id, data, user.id);
  }
}
