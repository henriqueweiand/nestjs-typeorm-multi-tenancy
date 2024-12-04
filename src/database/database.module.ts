import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from '../tenancy/tenancy.module';

@Module({
  imports: [ConfigModule, TenancyModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
