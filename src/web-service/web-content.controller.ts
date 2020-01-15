import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthPointName } from '@pardjs/auth-service-common';

import { CMSAuthPointsNames } from '../cms-auth-points.enum';
import { httpErrorHandler } from '../utils';
import { WebContentService } from '../web-content';
import {
  CreateWebContentDto,
  ReplaceWebContentDto,
  WebContentResDto,
} from '../web-content/dto';

@Controller('web-contents')
@ApiTags('WebContent')
export class WebContentController {
  constructor(private readonly webContentService: WebContentService) {}

  @Get('keys')
  async getKeys() {
    return this.webContentService.keys();
  }

  @Post('actions/upsert')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: WebContentResDto,
  })
  @AuthPointName(CMSAuthPointsNames.CREATE_WEB_CONTENT)
  @ApiBearerAuth()
  async create(@Body() data: CreateWebContentDto): Promise<WebContentResDto> {
    try {
      const webContent = await this.webContentService.upsert(
        data.key,
        data.value,
      );
      return webContent;
    } catch (error) {
      httpErrorHandler(error);
    }
  }

  @Get(':key')
  @ApiResponse({
    status: HttpStatus.OK,
    type: WebContentResDto,
  })
  @AuthPointName(CMSAuthPointsNames.FIND_ONE_WEB_CONTENT)
  @ApiBearerAuth()
  async findOne(@Param('key') key: string): Promise<WebContentResDto> {
    try {
      return await this.webContentService.findOne(key);
    } catch (error) {
      httpErrorHandler(error);
    }
  }

  @Post(':key/action/publish')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @AuthPointName(CMSAuthPointsNames.PUBLISH_WEB_CONTENT)
  @ApiBearerAuth()
  async publishToOss(@Param('key') key: string) {
    try {
      return await this.webContentService.publishToOss(key);
    } catch (error) {
      httpErrorHandler(error);
    }
  }
}
