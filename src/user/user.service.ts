import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string, provider: string, socialId: string) {
    const user = await this.usersRepository.findOne({
      // or?
      where: { email: email, provider: provider, socialId: socialId },
    });

    if (!user) {
      throw null;
    } else {
      return user;
    }
  }

  async setNickname(user: Users, nickname: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      user.nickname = nickname;
      return this.usersRepository.save(user);
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
