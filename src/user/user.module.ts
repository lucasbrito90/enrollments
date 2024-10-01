import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENROLLMENT_QUEUE } from 'src/common/events/constants.events';
import { UserCreatedListener } from 'src/mail/jobs/user-created.listener';
import { MailModule } from 'src/mail/mail.module';
import { PermissionModule } from 'src/permission/permission.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PermissionModule,
    MailModule,
    BullModule.registerQueue({
      name: ENROLLMENT_QUEUE,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserCreatedListener],
  exports: [UserService],
})
export class UserModule {}
