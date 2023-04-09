import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory';
import { Users } from 'src/entities/user';
import { Item } from 'src/entities/item';

@Injectable()
export class StoreService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async buyItem(userId: number, itemId: number) {
    // 1. get item price
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (item) {
      throw new BadRequestException('요청하신 아이템은 존재하지 않습니다!');
    }

    // 2. check user budget
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (user) {
      throw new BadRequestException('잘못된 요청입니다!');
    }

    if (user.cash < item.price) {
      throw new BadRequestException('아이템을 구매할 수 없습니다!');
    }

    // 3. run transaction
    //  3-1. insert info to user table
    //  3-2. reduce budget from user
    await this.dataSource.manager
      .transaction(async (manager) => {
        const inventory = new Inventory();
        inventory.itemOwnerId = userId;
        inventory.itemId = itemId;
        inventory.isUsed = false;

        user.cash -= item.price;
        await manager.save(user);
        await manager.save(inventory);
      })
      .catch((e) => {
        throw e;
      });
  }
}
