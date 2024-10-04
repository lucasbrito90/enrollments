import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [UserModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
