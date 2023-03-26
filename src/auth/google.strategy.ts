import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

const callbackURL =
  process.env.NODE_ENV === 'prod'
    ? `${process.env.PROD_SERVER_URL}${process.env.GOOGLE_CALLBACK_URL}`
    : `${process.env.DEV_SERVER_URL}${process.env.GOOGLE_CALLBACK_URL}`;
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: callbackURL,
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
