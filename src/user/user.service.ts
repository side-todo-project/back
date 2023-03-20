import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { DataSource, Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { Schedules } from 'src/entities/schedule';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async updateRefreshToken(refreshToken: string, userId: number) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async checkRefreshTokenValidate(refreshToken: string, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const check = await compare(refreshToken, user.refreshToken);

    if (check) {
      return user.id;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      refreshToken: null,
    });
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

  async getUserInfo(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return { message: '존재하지 않는 사용자 입니다.' };
    }

    const schedules = await this.scheduleRepository.find({
      where: { ScheduleOwnerId: userId },
    });

    let mosttags = [];
    let scheduleCount = 0;
    let completedScheduleCount = 0;

    if (schedules) {
      const tagsMap: {
        [key: string]: number;
      } = {};

      schedules.forEach((e) => {
        scheduleCount += e.check.length;
        completedScheduleCount += e.check.filter((e) => e).length;

        e.tags.forEach((e) => {
          tagsMap[e] = (tagsMap[e] || 0) + 1;
        });
      });

      const tags = Object.entries(tagsMap);
      tags.sort((a, b) => b[1] - a[1]);
      mosttags = tags.slice(0, 5);
    }

    return {
      nickname: user.nickname,
      mosttags: mosttags,
      introduction: 'description',
      schedcnt: scheduleCount,
      schedcomplete: completedScheduleCount,
    };
  }
}
