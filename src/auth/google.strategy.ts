import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

// 여기 kakaoType 부분은 어디 폴더로 뺄지 논의 후 이동
interface kakaoType {
  _json: {
    id: number;
    emails: any;
  };
}
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: CallableFunction,
  ) {
    const socialId = profile.id;
    const email = profile?.emails[0].value;
    const user = {
      socialId: socialId,
      email: email,
    };
    done(null, user);
  }
}
