import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';

import { TenancyService } from 'src/tenancy/tenancy.service';
import { DataSourceConfig } from './datasource.config';
import { Tenant } from 'src/tenancy/entities/tanant.entity';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private tenantConnections = new Map<string, DataSource>();
  private defaultDataSource: DataSource;

  constructor(
    private readonly tenancyService: TenancyService,
    @Inject(DataSourceConfig.KEY)
    private readonly dataSourceConfig: ConfigType<typeof DataSourceConfig>,
  ) {
  }

  private async initializeDefaultConnection() {
    const defaultDataSourceOptions: DataSourceOptions = {
      type: this.dataSourceConfig.type,
      host: this.dataSourceConfig.host,
      username: this.dataSourceConfig.username,
      password: this.dataSourceConfig.password,
      database: this.dataSourceConfig.database,
      port: this.dataSourceConfig.port,
      logging: this.dataSourceConfig.logging,
      entities: [__dirname + '/../tenancy/**/*.entity{.ts,.js}'],
      migrations: [`${__dirname}/system-migrations/*{.ts,.js}`],
      migrationsRun: true,
      synchronize: false,
    };
    this.defaultDataSource = new DataSource(defaultDataSourceOptions);
    await this.defaultDataSource.initialize();
    this.logger.log('Default connection initialized');
  }

  async onModuleInit() {
    await this.initializeDefaultConnection();
    await this._createTenantConnections();
  }

  private _createConnectionString(tenant: Tenant): string {
    return `${tenant.connectionType}://${tenant.username}:${tenant.password}@${tenant.host}:${tenant.port}/${tenant.database}`;
  }

  private async _createTenantConnections() {
    const tenantRepository: Repository<Tenant> = this.defaultDataSource.getRepository(Tenant);
    const tenants = await tenantRepository.find();

    for (const tenant of tenants) {
      const connectionsString = this._createConnectionString(tenant);
      await this._createTenantConnection(tenant, connectionsString);
    }

    await this.defaultDataSource.close();
    this.logger.log('Default connection closed');
  }

  private async _createTenantConnection(
    tenant: Tenant,
    connectionString: string,
  ) {
    await this._createDatabaseIfNotExists(tenant.database);

    const dataSourceOptions: DataSourceOptions = {
      type: tenant.connectionType as any,
      url: connectionString,
      synchronize: false,
      migrationsRun: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    };

    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();

    this.tenantConnections.set(tenant.id, dataSource);
    this.logger.log(`Initialized connection ${tenant.database}`);
  }

  private async _createDatabaseIfNotExists(database: string) {
    const result = await this.defaultDataSource.query(`
        SELECT 1
        FROM pg_database
        WHERE datname = '${database}'    
    `);

    if (!result.length) {
      this.logger.log(`Creating database ${database}`);
      await this.defaultDataSource.query(`CREATE DATABASE ${database}`);
    }
  }

  getDatabase() {
    return this.tenantConnections.get(
      this.tenancyService.getTenantContext().tenantId,
    );
  }
}