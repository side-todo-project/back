import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  Put,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/skip-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { SetNicknameRequestDto } from './dto/setNickname.request.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiHeader({ name: 'access', description: 'access token' })
@Controller('api/user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Public()
  // @UseGuards(JwtAuthGuard)
  @Get('/test')
  async test(@Res() res: Response) {}

  @UseGuards(JwtAuthGuard)
  @Get('/test2')
  async test2(@Req() req, @Res() res: Response) {
    console.log('req.user in user:', req.user);
    res.send('hi');
  }

  @Put('/nickname')
  @ApiOperation({ summary: '회원가입 후 닉네임 설정하기' })
  @ApiBody({ type: SetNicknameRequestDto })
  async nickname(@Body() data: SetNicknameRequestDto) {
    return this.usersService.setNickname(data.email, data.nickname);
  }
}
