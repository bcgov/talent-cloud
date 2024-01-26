import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// import { APP_ENV } from '../common/const';

// const isLocal = process.env.NODE_ENV === APP_ENV.LOCAL;

export const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? 'tc_user',
  password: process.env.DB_PASSWORD ?? 'tc_password',
  database: process.env.DB_NAME ?? 'tc',
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
};

export const datasource = new DataSource(config as DataSourceOptions);
