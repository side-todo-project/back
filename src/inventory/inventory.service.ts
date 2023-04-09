import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory';

import { DataSource, Repository } from 'typeorm';
import { itemDto } from './dto/getInventoryItems.response.dto';

@Injectable()
export class InventoryService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async getInventoryItems(userId: number) {
    const inventoryItems = await this.inventoryRepository.find({
      where: { itemOwnerId: userId },
      relations: ['ItemId'],
    });

    const result: itemDto[] = [];

    inventoryItems.forEach((e) => {
      const item: itemDto = {
        itemId: e.itemId,
        isUsed: e.isUsed,
        name: e.ItemId.name,
        price: e.ItemId.price,
        comment: e.ItemId.comment,
      };

      result.push(item);
    });

    return {
      items: result,
    };
  }
}
