import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [UserModule, JwtModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
