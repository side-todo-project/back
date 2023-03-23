import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import dotenv from 'dotenv';
dotenv.config();

// 여기 kakaoType 부분은 어디 폴더로 뺄지 논의 후 이동
interface kakaoType {
  _json: {
    id: number;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image: string;
    };

    kakao_account: {
      profile: {
        nickname: string;
        profile_image_url: string;
        thumbnail_image_url: string;
      };
      email: string;
    };
  };
}

const callbackURL =
  process.env.NODE_ENV === 'prod'
    ? `${process.env.PROD_SERVER_URL}${process.env.KAKAO_REDIRECT_URL}`
    : `${process.env.DEV_SERVER_URL}${process.env.KAKAO_REDIRECT_URL}`;
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: kakaoType,
    done: CallableFunction,
  ) {
    const profileJson = profile._json;
    const socialId = profileJson.id;
    const email = profileJson.kakao_account.email;

    console.log(callbackURL);
    const user = {
      socialId: socialId,
      email: email,
    };

    done(null, user);
  }
}
