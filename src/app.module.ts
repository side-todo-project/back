import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { Users } from './entities/user';
import { Schedules } from './entities/schedule';

import ormconfig from '../ormconfig';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    ScheduleModule,
    Users,
    Schedules,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class AppModule {}
