import { ApiProperty } from '@nestjs/swagger';

export class itemDto {
  @ApiProperty({
    name: 'itemId',
    description: '아이템 id',
    example: 1,
  })
  itemId: number;

  @ApiProperty({
    name: 'isUsed',
    description: '아이템의 사용여부',
    example: false,
  })
  isUsed: boolean;

  @ApiProperty({
    name: 'name',
    description: '아이템 이름',
    example: '감자칩',
  })
  name: string;

  @ApiProperty({
    name: 'price',
    description: '아이템의 가격',
    example: 1000,
  })
  price: number;

  @ApiProperty({
    name: 'comment',
    description: '아이템 설명',
    example: '짭잘하고 바삭한 맛있는 감자칩이다',
  })
  comment: string;
}

export class getInventoryItemsResponseDto {
  items: itemDto[];
}
