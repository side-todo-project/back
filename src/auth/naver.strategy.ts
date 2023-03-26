import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import dotenv from 'dotenv';
dotenv.config();

interface naverType {
  provider: string;
  _json: {
    id: number;
    email: string;
    nickname: string;
  };
}

const callbackURL =
  process.env.NODE_ENV === 'prod'
    ? `${process.env.PROD_SERVER_URL}${process.env.NAVER_CALLBACK_URL}`
    : `${process.env.DEV_SERVER_URL}${process.env.NAVER_CALLBACK_URL}`;
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: naverType,
    done: CallableFunction,
  ) {
    const profileJson = profile._json;
    const socialId = profileJson.id;
    const email = profileJson.email;

    const user = {
      socialId: socialId,
      email: email,
    };

    done(null, user);
  }
}
