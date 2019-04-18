import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { FindManyOptions } from 'typeorm';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { UpsertTagDto } from '../tag/dto/upsert-tag.dto';
import { Tag } from '../tag/tag.entity';

@Controller('tags')
@ApiUseTags('Tag')
export class TagController {
    constructor() {}

    @AuthPointName(CMSAuthPointsNames.CREATE_TAG)
    @Post('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    create(@Body() data: UpsertTagDto) {}

    @AuthPointName(CMSAuthPointsNames.FIND_CATEGORIES)
    @Get('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    find(@Query() query: FindManyOptions<Tag>) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_TAG)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: number) {
        // TODO: validate id in dto
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_TAG)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_TAG)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    update(@Param('id') id: number, @Body() data: UpsertTagDto) {
    }
}
