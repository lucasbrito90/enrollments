import {
  CreateBucketCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class AwsService {
  constructor(private readonly config: ConfigService) {}

  private readonly s3Client: S3Client = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(
    buffer: Buffer,
    bucket: string,
    key: string,
    mimetype: string,
  ) {
    const params = {
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype, // Define o tipo do arquivo
      },
    };

    const upload = new Upload(params);

    try {
      await upload.done();
    } catch (error) {
      throw new Error(error.message);
    }

    return `${process.env.AWS_ENDPOINT}/${bucket}/${key}`;
  }

  async getFile(bucket: string, key: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      const response = await this.s3Client.send(command);

      const stream = response.Body as Readable;
      const chunks: any[] = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error) {
      throw new NotFoundException(
        error.message || 'File not found in the bucket.',
      );
    }
  }

  async createBucket(bucket: string) {
    const command = new CreateBucketCommand({ Bucket: bucket });
    await this.s3Client.send(command);
  }
}
