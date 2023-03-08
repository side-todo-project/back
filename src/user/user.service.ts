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
