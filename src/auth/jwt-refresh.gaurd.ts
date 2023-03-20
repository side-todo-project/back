import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  handleRequest(err: any, user: any) {
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException('Retry login');
    }
    return user;
  }
}
