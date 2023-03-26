import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/skip-auth.decorator';
import { UserService } from './user.service';

import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { followRequestDto} from "./dto/follow.request.dto";

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
    await this.usersService.setNickname(req.user.userId, data.nickname);
    return 'success';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/follow')
  @ApiOperation({ summary: '유저 팔로우 하기' })
  @ApiBody({ type: SetNicknameRequestDto })
  async follow(@Req() req, @Body() data: followRequestDto) {
    await this.usersService.follow(req.userId, data.userId);
    return 'success';
  }

  @Public()
  @Post('/unfollow')
  @ApiOperation({ summary: '유저 언팔로우 하기' })
  @ApiBody({ type: SetNicknameRequestDto })
  async unfollow(@Req() req, @Body() data) {
    await this.usersService.unfollow(data.follower, data.following);
    return 'success';
  }
}
