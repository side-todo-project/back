import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UserInfoRequestDto {
  @IsInt()
  @ApiProperty({
    name: 'userId',
    description: '유저 아이디',
    example: '1',
  })
  public userId: number;
}
