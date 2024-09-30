import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AddressModule } from 'src/address/address.module';
import { MailModule } from 'src/mail/mail.module';
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
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      database: process.env.DB_DATABASE,
      entities: dataSourceOption.entities,
      migrations: dataSourceOption.migrations,
      autoLoadEntities: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    UserModule,
    AddressModule,
    PhoneModule,
    PermissionModule,
    RoleModule,
    MenuModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
