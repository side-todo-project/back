import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/skip-auth.decorator';
import { UserService } from './user.service';
import { UserInfoRequestDto } from './request.dto/userInfo.request.dto';
import { SetNicknameRequestDto } from './request.dto/setNickname.request.dto';
import { followRequestDto } from './request.dto/follow.request.dto';
import { followerDto } from "./response.dto/follower.response.dto";
import { followingDto } from "./response.dto/following.response.dto";

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
  @Get('/follower')
  @ApiOperation({ summary: '팔로워 목록 가져오기' })
  async getFollower(@Req() req) {
    const followers = await this.usersService.getFollower(req.userId);
    return new followerDto(followers);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/following')
  @ApiOperation({ summary: '팔로잉 목록 가져오기' })
  async getFollowing(@Req() req) {
    const followings = await this.usersService.getFollowing(req.userId);
    return new followingDto(followings);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/follow')
  @ApiOperation({ summary: '유저 팔로우 하기' })
  @ApiBody({ type: followRequestDto })
  async follow(@Req() req, @Body() data: followRequestDto) {
    await this.usersService.follow(req.userId, data.userId);
    return 'success';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unfollow')
  @ApiOperation({ summary: '유저 언팔로우 하기' })
  @ApiBody({ type: followRequestDto })
  async unfollow(@Req() req, @Body() data: followRequestDto) {
    await this.usersService.unfollow(req.userId, data.userId);
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
