import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './libs/database/database.module';
import { TenancyModule } from './libs/tenancy/tenancy.module';
import { UsersModule } from './components/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TenancyModule,
    DatabaseModule,
    UsersModule
  ],
})
export class AppModule { }
