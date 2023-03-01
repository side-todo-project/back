import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user';
import { Item } from './item';

@Entity({ schema: 'todo', name: 'inventory' })
export class Inventory {
  @PrimaryColumn()
  itemOwnerId: number;

  @PrimaryColumn()
  itemId: number;

  @Column()
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn([{ name: 'itemOwnerId', referencedColumnName: 'id' }])
  ItemOwnerID: Users;

  @ManyToOne(() => Item, (item) => item.id)
  @JoinColumn([{ name: 'itemId', referencedColumnName: 'id' }])
  ItemId: Item;
}
