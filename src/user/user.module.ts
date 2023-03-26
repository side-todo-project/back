import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Schedules } from '../entities/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Schedules])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
