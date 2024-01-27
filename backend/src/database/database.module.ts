import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(config as PostgresConnectionOptions),
    }),
  ],
})
export class DatabaseModule {}
