import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { FindManyOptions } from 'typeorm';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { UpsertTagDto } from '../tag/dto/upsert-tag.dto';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Controller('tags')
@ApiUseTags('Tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @AuthPointName(CMSAuthPointsNames.CREATE_TAG)
    @Post('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    create(@Body() data: UpsertTagDto) {
        return this.tagService.findOrCreate(data.name);
    }

    @AuthPointName(CMSAuthPointsNames.FIND_CATEGORIES)
    @Get('')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    find(@Query() query: FindManyOptions<Tag>) {
        return this.tagService.find();
    }

    @AuthPointName(CMSAuthPointsNames.FIND_ONE_TAG)
    @Get(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: number) {
        return this.tagService.findOne({where: {id}});
    }

    @AuthPointName(CMSAuthPointsNames.REMOVE_TAG)
    @Delete(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
        return this.tagService.remove(id);
    }

    @AuthPointName(CMSAuthPointsNames.UPDATE_TAG)
    @Put(':id')
    @UseGuards(AirRolesGuard)
    @ApiBearerAuth()
    async update(@Param('id') id: number, @Body() data: UpsertTagDto) {
        const tag = await this.tagService.findOne({where: {id}});
        if (!tag) {
            throw new BadRequestException('tag not found');
        }
        tag.name = data.name;
        return this.tagService.save(tag);
    }
}
