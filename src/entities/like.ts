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
  likeOwnerId: number;

  @PrimaryColumn()
  scheduleOwnerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn([{ name: 'likeOwnerId', referencedColumnName: 'id' }])
  LikeOwnerID: Users;

  @ManyToOne(() => Schedules, (schedule) => schedule.id)
  @JoinColumn([{ name: 'scheduleOwnerId', referencedColumnName: 'id' }])
  ScheduleID: Users;
}
