import { Injectable } from '@nestjs/common';
import { PardjsUsersService } from '@pardjs/auth-service-nestjs-sdk';
import { logger } from '@pardjs/common';
import {
  CMSAuthPointsDisplayNames,
  CMSAuthPointsNames,
} from '../cms-auth-points.enum';

@Injectable()
export class WebServiceService {
  constructor(private readonly pardjsUsersService: PardjsUsersService) {
    if (!process.env.pm_id || parseInt(process.env.pm_id, 10) === 0) {
      const names = Object.values(CMSAuthPointsNames);
      const displayNames = Object.values(CMSAuthPointsDisplayNames);
      this.pardjsUsersService.registerAuthPoints({
        authPoints: names.map((name, i) => {
          return { name, displayName: displayNames[i] };
        }),
      });
      logger.info('register auth points done.');
    }
  }
}
