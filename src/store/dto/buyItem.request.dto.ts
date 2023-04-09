import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class buyItemRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'itemId',
    description: '아이템 아이디',
    example: 1,
  })
  itemId: number;
}
