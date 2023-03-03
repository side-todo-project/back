import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from './src/entities/user';
import { Schedules } from './src/entities/schedule';
import dotenv from 'dotenv';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Schedules],
  synchronize: false, // 한번 true한 뒤로는 무조건 false
  autoLoadEntities: true,
  // charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
