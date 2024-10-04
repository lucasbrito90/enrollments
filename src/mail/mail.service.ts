import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserWelcome(user: CreateUserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to our app',
      template: './welcome', // The `.ejs` extension is added automatically
      context: {
        name: user.name,
        email: user.email,
      },
    });
  }
}
