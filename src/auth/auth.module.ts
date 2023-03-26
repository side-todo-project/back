import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/entities/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

import dotenv from 'dotenv';
import { Schedules } from '../entities/schedule';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Schedules]),
    JwtModule.register({}),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    KakaoStrategy,
    NaverStrategy,
    GoogleStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
