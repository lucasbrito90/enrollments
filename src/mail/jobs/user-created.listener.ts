import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { randomUUID } from 'crypto';
import { AwsService } from 'src/aws/aws.service';
import {
  ENROLLMENT_QUEUE,
  USER_AVATAR_UPDATED_JOB,
  USER_CREATED_JOB,
} from 'src/common/events/constants.events';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { MailService } from '../mail.service';

@Processor(ENROLLMENT_QUEUE)
export class UserCreatedListener {
  constructor(
    private readonly mailService: MailService,
    private readonly awsService: AwsService,
    private readonly userService: UserService,
  ) {}

  @Process(USER_CREATED_JOB)
  async userCreated(job: Job<CreateUserDto>) {
    await this.mailService.sendUserWelcome(job.data);
  }

  @Process(USER_AVATAR_UPDATED_JOB)
  async userAvatarUpdated(
    job: Job<{
      user: UpdateUserDto;
      avatar: Express.Multer.File;
    }>,
  ) {
    const { user, avatar } = job.data;
    const fileKey = `${randomUUID()}-${Date.now()}`;
    const bucket = 'avatars';

    await this.awsService.createBucket(bucket);
    const url = await this.awsService.uploadFile(avatar, bucket, fileKey);

    user.avatar = url;
    await this.userService.update(user.id, user);
  }
}
