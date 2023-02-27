import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'todo', name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'comment', length: 32 })
  name: string;

  @Column()
  price: number;

  @Column('varchar', { name: 'comment', length: 128 })
  comment: string;

  @Column('integer', { name: 'buy_count', default: 0 })
  buyCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
