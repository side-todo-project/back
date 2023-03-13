import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { UserService } from '../user/user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user';
import { Schedules } from '../entities/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Schedules])],
  controllers: [ScheduleController],
  providers: [ScheduleService, UserService],
})
export class ScheduleModule {}
