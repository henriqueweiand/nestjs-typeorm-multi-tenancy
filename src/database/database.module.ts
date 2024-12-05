import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TenancyModule } from 'src/tenancy/tenancy.module';
import { DatabaseService } from './database.service';
import { DataSourceConfig } from './datasource.config';

@Module({
  imports: [
    TenancyModule,
    ConfigModule.forFeature(DataSourceConfig),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
