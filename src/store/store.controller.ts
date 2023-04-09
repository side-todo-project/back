import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { buyItemRequestDto } from './dto/buyItem.request.dto';
import { StoreService } from './store.service';

@ApiTags('store')
@ApiHeader({ name: 'access', description: 'access token' })
@Controller('api/store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: '상점에서 아이템 구매' })
  @ApiBody({ type: buyItemRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  async buyItem(@Req() req, @Body() data: buyItemRequestDto) {
    await this.storeService.buyItem(req.userId, data.itemId);
  }
}
