import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPointName, UserResponseDto } from '@pardjs/auth-service-common';
import { AirRolesGuard } from '@pardjs/auth-service-nestjs-sdk';
import { AliCloudOssService } from '../ali-cloud-oss/ali-cloud-oss.service';
import { ClientUploadActivityService } from '../client-upload-activity/client-upload-activity.service';
import { CreateCallbackDto } from '../client-upload-activity/create-callback.dto';
import { CMSAuthPointsNames } from './../cms-auth-points.enum';

@Controller()
@ApiTags('Common')
export class WebServiceController {
  constructor(
    private readonly aliCloudOssService: AliCloudOssService,
    private readonly clientUploadActivityService: ClientUploadActivityService,
  ) {}

  @Get('upload-policy')
  @AuthPointName(CMSAuthPointsNames.GET_UPLOAD_POLICY)
  @UseGuards(AirRolesGuard)
  @ApiBearerAuth()
  async getUploadPolicy(@Request() req: any) {
    const user = req.user as UserResponseDto;
    const userId = user.id;
    const request = await this.clientUploadActivityService.createRequest(
      userId,
    );
    const policy = this.aliCloudOssService.getPolicy(
      request.dir + '/',
      request.id,
    );
    return policy;
  }

  @Post('upload-callback')
  async uploadCallback(@Body() data: CreateCallbackDto) {
    return this.clientUploadActivityService.createCallback(data);
  }
}
