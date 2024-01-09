import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { APP_ENV } from '../common/const';

const isLocal = process.env.NODE_ENV === APP_ENV.LOCAL;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432'),
        username: process.env.DB_USER ?? 'tc_user',
        password: process.env.DB_PASSWORD ?? 'tc_password',
        database: process.env.DB_NAME ?? 'tc',
        synchronize: isLocal,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
