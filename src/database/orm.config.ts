
import { DataSource, DataSourceOptions } from 'typeorm';

// Change the following line to match the name of the app
const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tenant1',
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  logging: true,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
