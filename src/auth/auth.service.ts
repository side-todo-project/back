import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/user';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, socialId: string, provider: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });

    if (user) {
      const token = this.jwtService.sign({ userEmail: email });
      return { userData: user, accessToken: token, newUser: false };
    }

    try {
      console.log('create new User with kakao......');
      const newUser = await queryRunner.manager.getRepository(Users).save({
        email,
        socialId,
        nickname: 'any',
        provider: provider,
        cash: 0,
      });
      const token = this.jwtService.sign({ userEmail: email });

      await queryRunner.commitTransaction();
      return { userData: newUser, accessToken: token, newUser: true };
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
