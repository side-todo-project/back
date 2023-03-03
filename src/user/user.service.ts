import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email'],
    });
  }

  async join(email: string, nickname: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    try {
      await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
      });

      await queryRunner.commitTransaction();

      console.log('save!');
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
