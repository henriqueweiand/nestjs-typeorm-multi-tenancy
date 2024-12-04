import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { execSync } from 'child_process';
import { createConnection, DataSource, DataSourceOptions, getConnectionManager } from 'typeorm';

import { TenancyService } from 'src/tenancy/tenancy.service';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private tenantConnections = new Map<string, DataSource>();
  private defaultDataSource: DataSource;

  constructor(
    private readonly tenancyService: TenancyService,
    private readonly configService: ConfigService,
  ) {
  }

  private async initializeDefaultConnection() {
    const defaultDataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      // url: this.configService.get<string>('DATABASE_URL'),
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      logging: true,
      port: 5432,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    };
    this.defaultDataSource = new DataSource(defaultDataSourceOptions);
    await this.defaultDataSource.initialize();
    this.logger.log('Default connection initialized');
  }

  async onModuleInit() {
    await this.initializeDefaultConnection();
    await this.createTenantConnections();
  }

  private async createTenantConnections() {
    for (const [tenantId, connectionString] of Object.entries(
      this.tenancyService.getTenants(),
    )) {
      await this.createTenantConnection(tenantId, connectionString);
      // this.runMigrations(tenantId, connectionString);
    }
  }

  private async createTenantConnection(
    tenantId: string,
    connectionString: string,
  ) {
    await this.createDatabaseIfNotExists(tenantId);
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      url: connectionString,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    };
    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();

    this.tenantConnections.set(tenantId, dataSource);
  }

  private async createDatabaseIfNotExists(tenantId: string) {
    const result = await this.defaultDataSource.query(`
        SELECT 1
        FROM pg_database
        WHERE datname = '${tenantId}'    
    `);

    if (result.length === 0) {
      await this.defaultDataSource.query(`CREATE DATABASE ${tenantId}`);
    }
  }

  private runMigrations(tenantId: string, connectionString: string) {
    const databaseUrl = this.configService.getOrThrow('DATABASE_URL');
    process.env.DATABASE_URL = connectionString;
    const output = execSync('typeorm migration:run', {
      encoding: 'utf-8',
    });
    this.logger.log(`Migrations ran for tenant ${tenantId}: ${output}`);
    process.env.DATABASE_URL = databaseUrl;
  }

  getDatabase() {
    return this.tenantConnections.get(
      this.tenancyService.getTenantContext().tenantId,
    );
  }
}