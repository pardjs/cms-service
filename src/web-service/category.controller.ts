import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { FindManyOptions } from 'typeorm';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { UpsertCategoryDto } from '../category/dto/upsert-category.dto';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';

@Controller('categories')
@ApiUseTags('Category')
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
    ) {}

    @AuthPointName(CMSAuthPointsNames.CREATE_CATEGORY)
    @Post('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    create(@Body() data: UpsertCategoryDto) {
        return this.service.findOrCreate(data.name);
    }

    @AuthPointName(CMSAuthPointsNames.FIND_CATEGORIES)
    @Get('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    find(@Query() query: FindManyOptions<Category>) {
        return this.service.find();
    }

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_CATEGORY)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: number) {
        return this.service.findOne({where: {id}});
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_CATEGORY)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_CATEGORY)
    @Put(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    async update(@Param('id') id: number, @Body() data: UpsertCategoryDto) {
        const category = await this.service.findOne({where: {id}});
        if (!category) {
            throw new BadRequestException('category not found');
        }
        category.name = data.name;
        return this.service.save(category);
    }
}
