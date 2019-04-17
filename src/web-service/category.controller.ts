import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { FindManyOptions } from 'typeorm';
import { Category } from '../category/category.entity';
import { UpsertCategoryDto } from '../category/dto/upsert-category.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';

@Controller()
export class CategoryController {
    constructor() {}

    @AuthPointName(CMSAuthPointsNames.CREATE_CATEGORY)
    @Post('')
    @UseGuards(AirRolesGuard)
    create(@Body() data: UpsertCategoryDto) {}

    @AuthPointName(CMSAuthPointsNames.FIND_CATEGORIES)
    @Get('')
    @UseGuards(AirRolesGuard)
    find(@Query() query: FindManyOptions<Category>) {}

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_CATEGORY)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    findOne(@Param('id') id: number) {
        // TODO: validate id in dto
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_CATEGORY)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    remove(@Param('id') id: number) {
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_CATEGORY)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    update(@Param('id') id: number, @Body() data: UpsertCategoryDto) {
    }
}
