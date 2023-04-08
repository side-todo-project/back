import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { buyItemRequestDto } from './dto/buyItem.request.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: '상점에서 아이템 구매' })
  @ApiBody({ type: buyItemRequestDto })
  @ApiResponse({
    status: 200,
    description: '성공',
    // type: scheduleResponseDto,
  })
  async buyItem(@Req() req, @Body() data: buyItemRequestDto) {
    // return this.storeService.buyItem();
  }
}
