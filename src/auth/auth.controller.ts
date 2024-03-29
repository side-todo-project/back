import { Request, Response } from 'express';

import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { Req, Res, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from './skip-auth.decorator';
import { AuthGuard } from '@nestjs/passport/dist';
import { JwtRefreshGuard } from './jwt-refresh.gaurd';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import dotenv from 'dotenv';
dotenv.config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '카카오 로그인 api',
  })
  @ApiResponse({
    status: 200,
    description:
      '닉네임이 설정되어있다면 /로 없다면 /nickname으로 redirect됩니다! 토큰은 자동으로 header에 설정됩니다.',
  })
  @Public()
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'kakao',
    );

    if (result.newUser) {
      return res
        .cookie('Authentication', result.accessToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .cookie('Refresh', result.refreshToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .redirect(301, `${process.env.FRONT_PORT}/nickname`);
    }

    return res
      .cookie('Authentication', result.accessToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .cookie('Refresh', result.refreshToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .redirect(301, `${process.env.FRONT_PORT}`);
  }

  @ApiOperation({
    summary: '네이버 로그인 api',
  })
  @ApiResponse({
    status: 200,
    description:
      '닉네임이 설정되어있다면 /로 없다면 /nickname으로 redirect됩니다! 토큰은 자동으로 header에 설정됩니다.',
  })
  @Public()
  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'naver',
    );

    if (result.newUser) {
      return res
        .cookie('Authentication', result.accessToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .cookie('Refresh', result.refreshToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .redirect(301, `${process.env.FRONT_PORT}/nickname`);
    }

    return res
      .cookie('Authentication', result.accessToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .cookie('Refresh', result.refreshToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .redirect(301, `${process.env.FRONT_PORT}`);
  }

  @ApiOperation({
    summary: '구글 로그인 api',
  })
  @ApiResponse({
    status: 200,
    description:
      '닉네임이 설정되어있다면 /로 없다면 /nickname으로 redirect됩니다! 토큰은 자동으로 header에 설정됩니다.',
  })
  @Public()
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'google',
    );

    if (result.newUser) {
      return res
        .cookie('Authentication', result.accessToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .cookie('Refresh', result.refreshToken, {
          expires: new Date(Date.now() + 900000000000),
          maxAge: 900000000000,
          httpOnly: true,
        })
        .redirect(301, `${process.env.FRONT_PORT}/nickname`);
    }

    return res
      .cookie('Authentication', result.accessToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .cookie('Refresh', result.refreshToken, {
        expires: new Date(Date.now() + 900000000000),
        maxAge: 900000000000,
        httpOnly: true,
      })
      .redirect(301, `${process.env.FRONT_PORT}`);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const accessToken = this.authService.reIssueAccessToken(req.user.userId);
    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000000000),
    });
    return 'success';
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  @ApiHeader({ name: 'access', description: 'access token' })
  async logOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.userService.removeRefreshToken(req.user.userId);

    res
      .cookie('Authentication', '', {
        httpOnly: true,
      })
      .cookie('Refresh', '', {
        httpOnly: true,
      });
    return res.send('success');
  }
}
