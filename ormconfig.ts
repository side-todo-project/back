import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from './src/entities/user';
import { Schedules } from './src/entities/schedule';
import dotenv from 'dotenv';
import { LikeHistory } from 'src/entities/like';
import { Item } from 'src/entities/item';
import { Inventory } from 'src/entities/inventory';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'todo',
  entities: [Users, Schedules, LikeHistory, Inventory, Item],
  synchronize: false, // 한번 true한 뒤로는 무조건 false
  autoLoadEntities: true,
  // charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
