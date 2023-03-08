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
import { JwtMiddleware } from './middlewares/jwt.middleware';

//entities
import { Users } from './entities/user';
import { Schedules } from './entities/schedule';

@Module({
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
  imports: [
    UserModule,
    ScheduleModule,
    AuthModule,
    Users,
    Schedules,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Users]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: 'api/*', // 특정 path 혹은 method에 대해서만 적용 시킬수도 있다.
      method: RequestMethod.ALL,
    });
  }
}
