import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async reIssueAccessToken(userId: number) {
    const accessToken = this.jwtService.sign(
      {
        userId: userId,
      },
      {
        expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
        secret: process.env.REFRESH_SECRET,
      },
    );
    return accessToken;
  }

  async validateUser(email: string, socialId: string, provider: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      const accessToken = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
          secret: process.env.ACCESS_SECRET,
        },
      );

      const refreshToken = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: `${process.env.REFRESH_EXPIRATION_TIME}s`,
          secret: process.env.REFRESH_SECRET,
        },
      );

      await this.userService.updateRefreshToken(refreshToken, user.id);

      if (user.nickname === null) {
        return {
          userData: user,
          refreshToken: refreshToken,
          accessToken: accessToken,
          newUser: true,
        };
      } else {
        return {
          refreshToken: refreshToken,
          accessToken: accessToken,
          newUser: false,
        };
      }
    }

    try {
      const newUser = new Users();
      newUser.email = email;
      newUser.nickname = '';
      newUser.socialId = socialId;
      newUser.provider = provider;
      newUser.cash = 0;
      await this.usersRepository.save(newUser);

      const accessToken = this.jwtService.sign(
        { userId: newUser.id },
        {
          expiresIn: `${process.env.REFRESH_EXPIRATION_TIME}s`,
          secret: process.env.ACCESS_SECRET,
        },
      );
      const refreshToken = this.jwtService.sign(
        {
          userId: newUser.id,
        },
        {
          expiresIn: `${process.env.REFRESH_EXPIRATION_TIME}s`,
          secret: process.env.REFRESH_SECRET,
        },
      );

      await this.userService.updateRefreshToken(refreshToken, newUser.id);

      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
        newUser: true,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
