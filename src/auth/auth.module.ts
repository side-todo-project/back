import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/entities/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { GoogleStrategy } from './google.strategy';

import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      // 그냥 process.env.JWT_SECRET라고 적으면 인식 불가
      secret: `${process.env.JWT_SECRET}`,
    }),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, NaverStrategy, GoogleStrategy],
})
export class AuthModule {}
