import { Module } from '@nestjs/common';
import { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

import { TENANT_KEY } from './tenancy.constants';

@Module({
  imports: [
    ClsModule.forRoot({
      global: false,
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          const tenantId = req.headers['tenant-id'];

          cls.set(TENANT_KEY, tenantId);
        },
      },
    }),
  ],
  exports: [ClsModule],
})
export class TenancyModule { }
