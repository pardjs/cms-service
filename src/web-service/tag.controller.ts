import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/auth-service-common';
import { AirRolesGuard } from '@pardjs/auth-service-nestjs-sdk';
import { FindManyOptions } from 'typeorm';
import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { TagResponseDto } from '../tag/dto/tag-response.dto';
import { UpsertTagDto } from '../tag/dto/upsert-tag.dto';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Controller('tags')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @AuthPointName(CMSAuthPointsNames.CREATE_TAG)
  @Post('')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: TagResponseDto,
    status: HttpStatus.CREATED,
  })
  create(@Body() data: UpsertTagDto) {
    return this.tagService.findOrCreate(data.name);
  }

  @AuthPointName(CMSAuthPointsNames.FIND_CATEGORIES)
  @Get('')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: TagResponseDto,
    status: HttpStatus.OK,
    isArray: true,
  })
  find(@Query() query: FindManyOptions<Tag>) {
    return this.tagService.find();
  }

  @AuthPointName(CMSAuthPointsNames.FIND_ONE_TAG)
  @Get(':id')
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: TagResponseDto,
    status: HttpStatus.OK,
  })
  findOne(@Param('id') id: number) {
    return this.tagService.findOne({ where: { id } });
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
  @ApiResponse({
    type: TagResponseDto,
    status: HttpStatus.OK,
  })
  async update(@Param('id') id: number, @Body() data: UpsertTagDto) {
    const tag = await this.tagService.findOne({ where: { id } });
    if (!tag) {
      throw new BadRequestException('tag not found');
    }
    tag.name = data.name;
    return this.tagService.save(tag);
  }
}
