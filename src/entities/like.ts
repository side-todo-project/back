import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user';
import { Schedules } from './schedule';

@Entity({ schema: 'todo', name: 'like_history' })
export class LikeHistory {
  @PrimaryColumn()
  UserId: number;

  @PrimaryColumn()
  ScheduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Schedules, (schedule) => schedule.id)
  @JoinColumn([{ name: 'ScheduleId', referencedColumnName: 'id' }])
  Schedule: Schedules;
}
