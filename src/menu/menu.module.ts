import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [UserModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
