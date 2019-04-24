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
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { WebContentService } from '.';
import { httpErrorHandler } from '../utils';
import {
  CreateWebContentDto,
  PublishWebContentDto,
  ReplaceWebContentDto,
  WebContentResDto,
} from './dto';

@Controller('api/web-contents')
@ApiUseTags('WebContent')
export class WebContentController {
  constructor(private readonly webContentService: WebContentService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: WebContentResDto,
  })
  async create(
    @Body() data: CreateWebContentDto,
    @Headers('Accept-Language') lang?: string,
  ): Promise<WebContentResDto> {
    try {
      const webContent = await this.webContentService.create(
        data.name,
        data.content,
      );
      return webContent as WebContentResDto;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Put(':name')
  @ApiResponse({
    status: HttpStatus.OK,
    type: WebContentResDto,
  })
  async replaceOne(
    @Param('name') name: string,
    @Body() data: ReplaceWebContentDto,
    @Headers('Accept-Language') lang: string,
  ): Promise<WebContentResDto> {
    try {
      return (await this.webContentService.replaceOne(
        name,
        data,
      )) as WebContentResDto;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Get(':name')
  @ApiResponse({
    status: HttpStatus.OK,
    type: WebContentResDto,
  })
  async findOne(
    @Param('name') name: string,
    @Headers('Accept-Language') lang: string,
  ): Promise<WebContentResDto> {
    try {
      return (await this.webContentService.findOne(name)) as WebContentResDto;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Post(':name/action/publish')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async publishToOss(
    @Param('name') name: string,
    @Body() data: PublishWebContentDto,
    @Headers('Accept-Language') lang: string,
  ) {
    try {
      const { bucket, path } = data;
      return await this.webContentService.publishToOss(name, bucket, path);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
