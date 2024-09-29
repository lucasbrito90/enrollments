import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PhoneModule } from 'src/phone/phone.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { dataSourceOption } from '../../database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOption,
      autoLoadEntities: true,
    }),
    UserModule,
    AddressModule,
    PhoneModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
