/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromBuffer } from 'file-type';

export async function isAnImage(buffer: Buffer): Promise<boolean> {
  if (!buffer) {
    return false;
  }

  const fileType = await fromBuffer(buffer);

  if (!fileType || !fileType.mime.startsWith('image/')) {
    return false;
  }

  return true;
}
