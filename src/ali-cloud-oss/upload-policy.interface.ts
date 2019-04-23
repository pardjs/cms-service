export interface UploadPolicy {
  accessid: string;
  host: string;
  expire: number;
  signature: string;
  policy: string;
  dir: string;
  callback: string;
}
