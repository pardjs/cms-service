import { Injectable } from '@nestjs/common';
import { MS_ONE_SECOND, objToBase64, sha1 } from '@pardjs/common';
import { createHmac } from 'crypto';
import { join } from 'path';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BASE_PATH, BUCKET, CALLBACK_URL, REGION } from './constants';
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
    const configBase64 = objToBase64(config);
    const signature = sha1(ACCESS_KEY_SECRET, configBase64);
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
      callback: objToBase64(callback),
    };
    return policy;
  }
}
