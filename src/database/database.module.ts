import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TenancyModule } from '../tenancy/tenancy.module';
import { DataSourceConfig } from './datasource.config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forFeature(DataSourceConfig),
    TenancyModule
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
