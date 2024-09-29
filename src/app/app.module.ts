import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { MenuModule } from 'src/menu/menu.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PhoneModule } from 'src/phone/phone.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { dataSourceOption } from '../../database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      database: process.env.DB_DATABASE,
      entities: dataSourceOption.entities,
      migrations: dataSourceOption.migrations,
      autoLoadEntities: true,
    }),
    UserModule,
    AddressModule,
    PhoneModule,
    PermissionModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
