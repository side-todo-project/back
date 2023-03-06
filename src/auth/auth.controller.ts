import { Controller, Get } from '@nestjs/common';
import { HttpCode, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport/dist';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Get('/kakao/redirect')
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'kakao',
    );

    return res.send(result);
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Get('/naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'naver',
    );

    return res.send(result);
  }
}
