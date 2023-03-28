import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class followRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'userId',
    description: '팔로우또는 언팔로우할 유저 아이디',
    example: 1,
  })
  public userId: number;
}
