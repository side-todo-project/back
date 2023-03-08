import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware<Request, Response> {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('access' in req.headers) {
      const token = req.headers['access'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (
          typeof decoded === 'object' &&
          decoded.hasOwnProperty('userEmail')
        ) {
          req['userEmail'] = decoded.userEmail;
        }
      } catch (error) {
        if (error.message === 'jwt expired') {
          throw new HttpException('EXPIRED TOKEN', HttpStatus.UNAUTHORIZED);
        } else {
          throw new HttpException('INVALID TOKEN', HttpStatus.UNAUTHORIZED);
        }
      }
    } else {
      throw new HttpException('NO TOKEN', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
