import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UserInfoRequestDto {
  @IsInt()
  @ApiProperty({
    name: 'id',
    description: '유저 아이디',
    example: '1',
  })
  public id: number;
}
