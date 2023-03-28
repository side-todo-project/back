import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SetNicknameRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    name: 'nickname',
    description: '새로운 유저 닉네임',
    example: 'newNickname',
  })
  public nickname: string;
}
