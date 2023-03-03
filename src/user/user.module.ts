import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
