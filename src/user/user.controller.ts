import {
  Body,
  Controller,
  Response,
  ForbiddenException,
  NotFoundException,
  Post,
  Put,
  Get,
} from '@nestjs/common';

import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Put('/nickname')
  async nickname(@Body() data: SetNicknameRequestDto) {
    return this.usersService.setNickname(data.email, data.nickname);
  }
}
