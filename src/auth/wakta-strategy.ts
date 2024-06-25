import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
@Injectable()
export class WaktaStrategy extends PassportStrategy(Strategy, 'wakta') {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL: 'https://waktaverse.games/oauth/authorize',
      tokenURL: 'https://waktaverse.games/api/oauth/token',
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: configService.get('CALLBACK_URL'),
      passReqToCallback: true,
      pkce: true,
      store: true,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile,
    };
    console.log(user);
    return done(null, user);
  }
}
