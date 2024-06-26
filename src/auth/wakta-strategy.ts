import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
@Injectable()
export class WaktaStrategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL: 'https://waktaverse.games/oauth/authorize',
      tokenURL: 'https://waktaverse.games/api/oauth/token',
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: configService.get('CALLBACK_URL'),
      profileURL: 'https://waktaverse.games/api/game-link/user/profile',
      passReqToCallback: true,
      pkce: true,
      state: true,
    });
  }
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: String(profile.id),
      name: profile.name,
      provider: 'waktaverse.games',
    };
    return done(null, user);
  }
}
