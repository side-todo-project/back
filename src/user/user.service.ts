import {
  Body,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { DataSource, Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async updateRefreshToken(refreshToken: string, userId: number) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async checkRefreshTokenValidate(refreshToken: string, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    console.log(user);
    const check = await compare(refreshToken, user.refreshToken);

    if (check) {
      return user.id;
    }
    console.log('fail');
  }

  async removeRefreshToken(userId: number) {
    console.log(userId);

    if (userId) {
      return await this.usersRepository.update(userId, {
        refreshToken: '',
      });
    } else {
      throw new Error('fail');
    }
  }

  async findUserById(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('INVALID USER', HttpStatus.NOT_FOUND);
    }

    return user.id;
  }

  async setNickname(email: string, nickname: string) {
    const dupNickname = await this.usersRepository.findOne({
      where: { nickname: nickname },
    });

    if (dupNickname) {
      return { message: '이미 존재하는 닉네임입니다!' };
    }

    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return { message: '존재하지 않는 사용자 입니다' };
    }

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Users)
        .set({
          nickname: nickname,
        })
        .where({ email: email })
        .execute();

      return { code: 200, success: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
