import { checkEnv } from '@pardjs/common';

checkEnv(
  'ALI_CLOUD_ACCESS_KEY_ID',
  'ALI_CLOUD_ACCESS_KEY_SECRET',
  'ALI_CLOUD_OSS_REGION',
  'ALI_CLOUD_OSS_BUCKET',
  'ALI_CLOUD_OSS_CALLBACK_URL',
);

export const ACCESS_KEY_ID = process.env.ALI_CLOUD_ACCESS_KEY_ID;
export const ACCESS_KEY_SECRET = process.env.ALI_CLOUD_ACCESS_KEY_SECRET;
export const REGION = process.env.ALI_CLOUD_OSS_REGION;
export const BUCKET = process.env.ALI_CLOUD_OSS_BUCKET;
export const PROTOCOL = process.env.ALI_CLOUD_OSS_PROTOCOL || 'http';
export const BASE_PATH = process.env.ALI_CLOUD_OSS_BASE_PATH || 'pardjs/';
export const CALLBACK_URL = process.env.ALI_CLOUD_OSS_CALLBACK_URL;
