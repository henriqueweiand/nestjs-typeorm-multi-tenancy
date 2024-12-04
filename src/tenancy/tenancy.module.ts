import { Module } from '@nestjs/common';
import { TenancyService } from './tenancy.service';

@Module({
  providers: [TenancyService],
  exports: [TenancyService],
})
export class TenancyModule {}
