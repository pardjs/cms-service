import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName, UserResponse } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { AliCloudOssService } from '../ali-cloud-oss/ali-cloud-oss.service';
import { ClientUploadActivityService } from '../client-upload-activity/client-upload-activity.service';
import { CreateCallbackDto } from '../client-upload-activity/create-callback.dto';
import { CMSAuthPointsNames } from './../cms-auth-points.enum';

@Controller()
@ApiUseTags('Common')
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
    const user = req.user as UserResponse;
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
