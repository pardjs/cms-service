import { Controller, Get } from '@nestjs/common';
import { spanHours } from '@pardjs/common';
import { AppService } from './app.service';
import { SERVICE_NAME } from './constants';

@Controller()
export class AppController {
  private uptime: Date;
  constructor(private readonly appService: AppService) {
    this.uptime = new Date();
  }

  @Get('ping')
  getHello() {
    return {
      SERVICE_NAME,
      uptime: this.uptime,
      hours: spanHours(this.uptime),
    };
  }
}
