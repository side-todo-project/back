import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private readonly jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, socialId: string, provider: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });

    if (user) {
      const accessToken = this.jwtService.sign(
        {
          userEmail: email,
        },
        { expiresIn: `${process.env.JWT_EXPIRATION_TIME}s` },
      );

      if (user.nickname === null) {
        return {
          userData: user,
          refreshToken: user.refreshToken,
          accessToken: accessToken,
          newUser: true,
        };
      } else {
        return {
          userData: user,
          refreshToken: user.refreshToken,
          accessToken: accessToken,
          newUser: false,
        };
      }
    }

    try {
      const refreshToken = this.jwtService.sign(
        {
          userEmail: email,
        },
        { expiresIn: `${process.env.REFRESH_EXPIRATION_TIME}s` },
      );

      const newUser = await queryRunner.manager.getRepository(Users).save({
        email,
        socialId,
        nickname: '',
        provider: provider,
        refreshToken: refreshToken,
        cash: 0,
      });
      const token = this.jwtService.sign({ userEmail: email });

      await queryRunner.commitTransaction();
      return {
        userData: newUser,
        refreshToken: refreshToken,
        accessToken: token,
        newUser: true,
      };
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRefreshToken(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      try {
        await this.dataSource
          .createQueryBuilder()
          .update(Users)
          .set({
            refrshToken: '',
          })
          .where({ email: email })
          .execute();

        return { success: true };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
}
