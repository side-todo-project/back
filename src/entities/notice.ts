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

@Entity({ schema: 'todo', name: 'notice' })
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noticeOwnerId: number;

  @Column('varchar', { name: 'desc', length: 512 })
  desc: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn([{ name: 'noticeOwnerId', referencedColumnName: 'id' }])
  NoticeOwnerId: Users;
}
