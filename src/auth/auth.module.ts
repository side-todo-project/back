import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Users } from 'src/entities/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { GoogleStrategy } from './google.strategy';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      // 그냥 process.env.JWT_SECRET라고 적으면 인식 불가
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
      },
    }),
    TypeOrmModule.forFeature([
      Users, //
    ]),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, NaverStrategy, GoogleStrategy],
})
export class AuthModule {}
