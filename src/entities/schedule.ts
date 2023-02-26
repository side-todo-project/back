import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user';

@Entity({ schema: 'todo', name: 'schedules' })
export class Schedules {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // @Column('date', { name: 'date' })
  // email: string;

  @Column('time', { name: 'time' })
  name: string;

  @Column('varchar', { name: 'when' })
  when: string;

  @Column('varchar', { name: 'todo' })
  todo: string;

  @Column('boolean', { name: 'private' })
  private: string;

  @Column('int', { name: 'likeCount' })
  likeCount: string;

  @Column('int', { name: 'check' })
  check: string;

  @Column('simple-array', { name: 'tags' })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'scheduleOwnerId', referencedColumnName: 'id' }])
  ScheduleOwnerId: Users;
}
