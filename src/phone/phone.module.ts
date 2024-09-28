import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Phone } from './entities/phone.entity';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone]), UserModule],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
