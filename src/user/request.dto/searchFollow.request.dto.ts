import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class searchFollowRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    name: 'nickname',
    description: '찾으려는 유저 닉네임',
    example: 'minwoo',
  })
  public nickname: string;
}
