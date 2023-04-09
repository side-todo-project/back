import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getInventoryItemsResponseDto } from './dto/getInventoryItems.response.dto';

@ApiTags('inventory')
@Controller('api/inventory')
export class InventoryController {
  constructor(private inventorySercie: InventoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiOperation({
    summary: '인벤토리 아이템 가져오기',
    description: '인벤토리에 있는 모든 사용자 아이템을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: getInventoryItemsResponseDto,
  })
  async getInventoryItems(@Req() req) {
    return await this.inventorySercie.getInventoryItems(req.userId);
  }
}
