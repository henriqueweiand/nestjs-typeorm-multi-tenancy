import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TenancyModule,
    DatabaseModule,
    UsersModule
  ],
})
export class AppModule { }
