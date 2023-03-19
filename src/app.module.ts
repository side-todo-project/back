import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';

//controller
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

//service
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

//middleware
import ormconfig from '../ormconfig';

//entities
import { Users } from './entities/user';
import { Schedules } from './entities/schedule';

//Guard
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    AuthService,
    UserService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  imports: [
    UserModule,
    ScheduleModule,
    AuthModule,
    Users,
    Schedules,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Users, Schedules]),
  ],
})
export class AppModule {}
