import {
  Body,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private scheduleRepository: Repository<Schedules>
  ) {
  }

  async updateRefreshToken(refreshToken: string, userId: number) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      refreshToken: hashedRefreshToken
    });
  }

  async checkRefreshTokenValidate(refreshToken: string, userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId }
      });
      const check = await compare(refreshToken, user.refreshToken);

      if (check) {
        return user.id;
      }
      throw new HttpException('INVALID USER', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log(error);
    }
  }

  async removeRefreshToken(userId: number) {
    try {
      await this.usersRepository.update(userId, {
        refreshToken: ""
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new HttpException("INVALID USER", HttpStatus.NOT_FOUND);
    }

    return user.id;
  }

  async setNickname(email: string, nickname: string) {
    const dupNickname = await this.usersRepository.findOne({
      where: { nickname: nickname }
    });

    if (dupNickname) {
      return { message: "이미 존재하는 닉네임입니다!" };
    }

    const user = await this.usersRepository.findOne({
      where: { email: email }
    });

    if (!user) {
      throw new HttpException("INVALID USER", HttpStatus.NOT_FOUND);
    }

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Users)
        .set({
          nickname: nickname
        })
        .where({ email: email })
        .execute();
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
      return { message: "존재하지 않는 사용자 입니다." };
    }

    const schedules = await this.scheduleRepository.find({
      where: { ScheduleOwnerId: userId }
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
      introduction: "description",
      schedcnt: scheduleCount,
      schedcomplete: completedScheduleCount
    };
  }

  async getFollower(myId: number) {
    try {
      const me = await this.usersRepository.findOne({
        where: { id: myId },
        relations: ['followers'],
      });

      if (!me) {
        throw new NotFoundException('user is not found');
      }

      return me.followers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getFollowing(myId: number) {
    try {
      const me = await this.usersRepository.findOne({
        where: { id: myId },
        relations: ['followings'],
      });

      if (!me) {
        throw new NotFoundException('user is not found');
      }

      return me.followings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchFollower(userId: number, userNickname: string) {
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder('user');
      const followings = await queryBuilder
        .leftJoinAndSelect('user.followings', 'following')
        .where('following.id = :userId', { userId })
        .andWhere('user.nickname LIKE :nickname', {
          nickname: `%${userNickname}%`,
        })
        .getMany();

      return followings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchFollowing(userId: number, userNickname: string) {
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder('user');
      const followers = await queryBuilder
        .leftJoinAndSelect('user.followers', 'followers')
        .where('followers.id = :userId', { userId })
        .andWhere('user.nickname LIKE :nickname', {
          nickname: `%${userNickname}%`,
        })
        .getMany();

      return followers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async follow(followerId: number, followingId: number) {
    try {
      const me = await this.usersRepository.findOne({
        where: { id: followerId }
      });

      const following = await this.usersRepository.findOne({
        where: { id: followingId }
      });

      if (!me || !following) {
        throw new NotFoundException("user is not found");
      }

      following.followers = [me];
      await this.usersRepository.save(following);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async unfollow(followerId: number, followingId: number) {
    try {
      const me = await this.usersRepository.findOne({
        where: { id: followerId }
      });

      const following = await this.usersRepository.findOne({
        where: { id: followingId },
        relations: ["followers"]
      });

      if (!me || !following) {
        throw new NotFoundException("user is not found");
      }

      following.followers = following.followers.filter((follower) => {
        return follower.id != followerId;
      });

      await this.usersRepository.save(following);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
