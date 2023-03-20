import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiHeader({ name: 'access', description: 'access token' })
@Controller('api/user')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/nickname')
  @ApiOperation({ summary: '회원가입 후 닉네임 설정하기' })
  @ApiBody({ type: SetNicknameRequestDto })
  async nickname(@Req() req, @Body() data: SetNicknameRequestDto) {
    this.usersService.setNickname(req.user.userId, data.nickname);
    return 'success';
  }
}
