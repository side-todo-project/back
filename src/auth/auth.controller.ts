import { Controller, Get, HttpException } from '@nestjs/common';
import { HttpCode, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport/dist';
import { AuthService } from './auth.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '카카오 로그인 api',
  })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden',
  // })
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

    if (result.newUser) {
      // 우리쪽에서 redirect 재요청할지 선택
      return res.status(200).send({ nickname: false });
    }
    return res.status(200).send(result);
  }

  @ApiOperation({ summary: '네이버 로그인 api' })
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

  @ApiOperation({ summary: '구글 로그인 api' })
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request) {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.validateUser(
      req.user.email,
      req.user.socialId,
      'google',
    );
    return res.send(result);
  }

  @ApiOperation({ summary: 'refresh Token' })
  @Get('/refresh')
  @ApiHeader({ name: 'refresh', description: 'refresh token' })
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    if ('refresh' in req.headers) {
      const token = req.headers['refresh'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (
          typeof decoded === 'object' &&
          decoded.hasOwnProperty('userEmail')
        ) {
          const accessToken = this.jwtService.sign({
            userEmail: decoded.userEmail,
          });
          return { success: true, acessToken: accessToken };
        }
      } catch (error) {
        if (error.message === 'jwt expired') {
          throw new HttpException(
            'refresh token expired login again',
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          throw new HttpException('INVALID TOKEN', HttpStatus.UNAUTHORIZED);
        }
      }
    } else {
      throw new HttpException('NO TOKEN', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/logout')
  @ApiHeader({ name: 'access', description: 'access token' })
  async logOut(@Req() req: Request, @Res() res: Response) {
    return await this.authService.deleteRefreshToken(req.userEmail);
  }
}
