import { Users } from '../../entities/user';
import { ApiProperty } from '@nestjs/swagger';

class followerResponseDto {
  
  @ApiProperty({
    name: 'followers',
    description: '팔로워 목록',
    properties: {
      id: {
        description: '유저 id',
      },
      nickname: {
        description: '유저 nickname',
      },
    },
  })
  public followers: {
    id: number;
    nickname: string;
  }[];

  constructor(obj: Users[]) {
    this.followers = [];
    obj.forEach((user) => {
      this.followers.push({ id: user.id, nickname: user.nickname });
    });
  }
}

export { followerResponseDto };
