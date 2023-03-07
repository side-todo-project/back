import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  async nickname(@Body() data: SetNicknameRequestDto) {
    const user = this.usersService.findByEmail(
      data.email,
      data.provider,
      data.socialId,
    );

    if (user == null) {
      throw new NotFoundException();
    }
  }
}
