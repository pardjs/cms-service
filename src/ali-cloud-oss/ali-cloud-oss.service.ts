import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BASE_PATH, BUCKET, REGION } from './constants';

// tslint:disable-next-line: no-var-requires
const OSS = require('ali-oss');

@Injectable()
export class AliCloudOssService {
  private client: any;
  constructor() {
    this.client = new OSS({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
      bucket: BUCKET,
    });
    // TODO: STS policy
  }

  saveText(path: string, content: string): Promise<{name: string}> {
    return this.client.put(join(BASE_PATH, path), Buffer.from(content));
  }
}
