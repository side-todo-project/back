import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedules } from './schedule';

@Entity({ schema: 'todo', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', unique: true, length: 20 })
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

  @OneToMany(() => Schedules, (schedules) => schedules.ScheduleOwnerId)
  OwnedUserSchedules: Schedules[];

  @ManyToMany(() => Users, (users) => users.id)
  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'followingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'follwerId',
      referencedColumnName: 'id',
    },
  })
  Users: Users[];
}
