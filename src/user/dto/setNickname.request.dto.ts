import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/user';

export class SetNicknameRequestDto extends PickType(Users, [
  'email',
  'socialId',
  'provider',
  'nickname',
] as const) {}
