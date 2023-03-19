import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiHeader({ name: 'access', description: 'access token' })
@Controller('api/user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Put('/nickname')
  @ApiOperation({ summary: '회원가입 후 닉네임 설정하기' })
  @ApiBody({ type: SetNicknameRequestDto })
  async nickname(@Body() data: SetNicknameRequestDto) {
    return this.usersService.setNickname(data.email, data.nickname);
  }
}
