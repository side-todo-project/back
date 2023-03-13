import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user';

@Entity({ schema: 'todo', name: 'charactors' })
export class Charactors {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'charactorSrc' })
  charactorSrc: string;

  @Column('simple-array', { name: 'items' })
  items: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => Users, (users) => users.Charactor)
  @JoinColumn()
  User: Users;
}
