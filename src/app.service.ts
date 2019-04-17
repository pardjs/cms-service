import { Injectable } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { PardjsUsersService } from '@pardjs/users-service-sdk';
import { CMSAuthPointsDisplayNames, CMSAuthPointsNames } from './cms-auth-points.enum';
import { SERVICE_NAME } from './constants';

@Injectable()
export class AppService {
  constructor(private readonly pardjsUsersService: PardjsUsersService ) {
    if (!process.env.pm_id || parseInt(process.env.pm_id, 10) === 0) {
      const names =  Object.values(CMSAuthPointsNames);
      const displayNames = Object.values(CMSAuthPointsDisplayNames);
      this.pardjsUsersService.registerAuthPoints({authPoints: names.map((name, i) => {
        return {name, displayName: displayNames[i]};
      })});
      logger.info('register auth points done.');
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
