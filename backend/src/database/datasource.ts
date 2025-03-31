import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? 'tc_user',
  password: process.env.DB_PASSWORD ?? 'tc_password',
  database: process.env.DB_NAME ?? 'tc',
  logging: true,
  maxQueryExecutionTime: 2000,
  // TODO change this to false in production
  synchronize: process.env.ENV === 'ci',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  cli: {
    entitiesDir: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrationsDir: [join(__dirname, 'migrations', '*.{ts,js}')],
  },
};

export const datasource = new DataSource(config as DataSourceOptions);
