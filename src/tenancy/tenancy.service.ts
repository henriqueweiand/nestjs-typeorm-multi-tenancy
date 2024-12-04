import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { readFileSync } from 'fs';
import { join } from 'path';

import { TenantContext } from './tenant-context.interface';
import { Tenants } from './tenants.interface';

@Injectable()
export class TenancyService implements OnModuleInit {
  private tenants: Tenants;
  private readonly asyncLocalStorage = new AsyncLocalStorage<TenantContext>();

  onModuleInit() {
    const tenants: Tenants = JSON.parse(
      readFileSync(join(__dirname, './tenants.json'), 'utf-8'),
    );
    this.tenants = tenants;
  }

  validateTenantId(tenantId: string) {
    if (!tenantId || !this.tenants[tenantId]) {
      throw new BadRequestException('Invalid tenant ID');
    }
  }

  runWithTenant(tenantId: string, callback: () => void) {
    this.asyncLocalStorage.run({ tenantId }, callback);
  }

  getTenantContext() {
    return this.asyncLocalStorage.getStore();
  }

  getTenants() {
    return this.tenants;
  }
}
