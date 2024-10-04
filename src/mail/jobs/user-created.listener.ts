import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  ENROLLMENT_QUEUE,
  USER_CREATED_JOB,
} from 'src/common/events/constants.events';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailService } from '../mail.service';

@Processor(ENROLLMENT_QUEUE)
export class UserCreatedListener {
  constructor(private readonly mailService: MailService) {}

  @Process(USER_CREATED_JOB)
  async userCreated(job: Job<CreateUserDto>) {
    await this.mailService.sendUserWelcome(job.data);
  }
}
