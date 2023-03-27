import { Users } from '../../entities/user';
import { ApiProperty } from "@nestjs/swagger";

class followingResponseDto {

  @ApiProperty({
    name: 'followings',
    description: '팔로잉 목록',
    properties: {
      id: {
        description: '유저 id',
      },
      nickname: {
        description: '유저 nickname',
      },
    },
  })
  public followings: {
    id: number;
    nickname: string;
  }[];

  constructor(obj: Users[]) {
    this.followings = [];
    obj.forEach((user) => {
      this.followings.push({ id: user.id, nickname: user.nickname });
    });
  }
}

export { followingResponseDto };
