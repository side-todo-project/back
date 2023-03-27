import { Users } from '../../entities/user';

class followerDto {
  constructor(obj: Users[]) {
    const follwers = [];
    obj.forEach((user) => {
      follwers.push({ id: user.id, nickname: user.nickname });
    });
    return follwers;
  }
}

export { followerDto };
