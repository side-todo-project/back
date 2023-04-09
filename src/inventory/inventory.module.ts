import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from 'src/entities/inventory';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Inventory])],
  controllers: [InventoryController, InventoryService],
  providers: [InventoryService],
})
export class InventoryModule {}
