import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user';
import { LikeHistory } from './like';

@Entity({ schema: 'todo', name: 'schedules' })
export class Schedules {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'scheduleDate' })
  scheduleDate: Date;

  @Column('json', { name: 'schedule' })
  schedule: string;

  @Column('boolean', { name: 'isPrivate' })
  isPrivate: boolean;

  @Column('int', { name: 'likeCount', default: 0 })
  likeCount: string;

  @Column('simple-array', { name: 'check' })
  check: boolean[];

  @Column('simple-array', { name: 'tags' })
  tags: string[];

  @Column('int', { name: 'ScheduleOwnerId', nullable: true })
  ScheduleOwnerId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.Schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ScheduleOwnerId', referencedColumnName: 'id' }])
  ScheduleOwner: Users;

  @OneToMany(() => LikeHistory, (likeHistory) => likeHistory.Schedule)
  LikeHistorys: LikeHistory[];
}
