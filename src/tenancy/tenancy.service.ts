import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

import { TenantContext } from './tenant-context.interface';

@Injectable()
export class TenancyService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<TenantContext>();

  runWithTenant(tenantId: string, callback: () => void) {
    this.asyncLocalStorage.run({ tenantId }, callback);
  }

  getTenantContext() {
    return this.asyncLocalStorage.getStore();
  }
}
