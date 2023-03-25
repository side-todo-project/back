import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';
import { UserInfoRequestDto } from './dto/userInfo.request.dto';

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

  @Get('/info')
  @ApiOperation({ summary: '다른 유저 정보 보여주기' })
  @ApiBody({ type: UserInfoRequestDto })
  async infoOther(@Body() data: UserInfoRequestDto) {
    return this.usersService.getUserInfo(data.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: '유저 정보 보여주기' })
  @ApiBody({ type: UserInfoRequestDto })
  async info(@Req() req) {
    return this.usersService.getUserInfo(req.id);
  }
}
