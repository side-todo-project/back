import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { Users } from './entities/user';
import { Schedules } from './entities/schedule';

import ormconfig from '../ormconfig';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
  imports: [
    UserModule,
    ScheduleModule,
    AuthModule,
    Users,
    Schedules,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class AppModule {}
