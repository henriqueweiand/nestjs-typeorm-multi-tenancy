
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();

const dataSourceOptions = {
  type: configService.getOrThrow('DEFAULT_DB_TYPE'),
  host: configService.getOrThrow('DEFAULT_DB_HOST'),
  port: configService.getOrThrow('DEFAULT_DB_PORT'),
  username: configService.getOrThrow('DEFAULT_DB_USERNAME'),
  password: configService.getOrThrow('DEFAULT_DB_PASSWORD'),
  database: configService.getOrThrow('DEFAULT_DB_NAME'),
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  logging: true,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
