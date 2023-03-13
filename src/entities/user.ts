import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedules } from './schedule';
import { LikeHistory } from './like';
import { Charactors } from './charactor';

@Entity({ schema: 'todo', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' }) // select:false option 달면 query시에 안가져옴
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 20 })
  nickname: string;

  @Column('varchar', { name: 'provider', length: 20 })
  provider: string;

  @Column('varchar', { name: 'socialId', length: 20 })
  socialId: string;

  @Column('int', { name: 'cash' })
  cash: number;

  @Column('varchar', { name: 'refreshToken', length: 20 })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Schedules, (schedules) => schedules.ScheduleOwner)
  Schedule: Schedules[];

  @OneToOne(() => Charactors, (charactors) => charactors.User)
  @JoinColumn()
  Charactor: Charactors;

  @OneToMany(() => LikeHistory, (likeHistory) => likeHistory.UserId)
  LikeHistorys: LikeHistory[];

  @ManyToMany(() => Users, (users) => users.id)
  @JoinTable({
    name: 'Follow',
    joinColumn: {
      name: 'FollowingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'FollwerId',
      referencedColumnName: 'id',
    },
  })
  Users: Users[];
}
