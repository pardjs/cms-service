import { Injectable } from '@nestjs/common';
import { MS_ONE_SECOND } from '@pardjs/common';
import { createHmac } from 'crypto';
import { join } from 'path';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BASE_PATH, BUCKET, REGION, CALLBACK_URL } from './constants';
import { UploadCallback } from './upload-callback.interface';
import { UploadConfig } from './upload-config.interface';
import { UploadPolicy } from './upload-policy.interface';

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

  async saveText(path: string, content: string): Promise<{name: string}> {
    const fullPath = join(BASE_PATH, path);
    return this.client.put(fullPath, Buffer.from(content));
  }

  getPolicy(uploadDir: string, requestId?: number) {
    // For expireAt
    const now = Date.now();
    const expireSeconds = 100;
    const expireAt = now + expireSeconds * MS_ONE_SECOND;
    // For signature
    const config = {} as UploadConfig;
    config.expiration = (new Date(expireAt)).toISOString();
    const condition = ['starts-with', '$key', BASE_PATH + uploadDir];
    config.conditions = [condition];
    const configBase64 = this.objToBase64(config);
    const signature = this.sha1(ACCESS_KEY_SECRET, configBase64);
    const callback: UploadCallback = {
      callbackUrl: CALLBACK_URL,
      callbackBody: 'filename=${object}&size=${size}&mimeType=${mimeType}',
      callbackBodyType: 'application/x-www-form-urlencoded',
    };
    if (requestId) {
      callback.callbackBody += '&requestId=' + requestId;
    }
    const policy: UploadPolicy = {
      accessid: ACCESS_KEY_ID,
      host: `http://${BUCKET}.${REGION}.aliyuncs.com`,
      expire: Math.floor(expireAt / 1000),
      signature,
      policy: configBase64,
      dir: BASE_PATH + uploadDir,
      callback: this.objToBase64(callback),
    };
    return policy;
  }

  private sha1(key: string, content: string) {
    return createHmac('sha1', key).update(content).digest('base64');
  }

  private objToBase64(obj: object) {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
  }
}
