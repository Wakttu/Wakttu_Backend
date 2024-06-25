import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStrategy } from './naver-strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/serializer';
import { LocalStrategy } from './local-strategy';
import { WaktaStrategy } from './wakta-strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    NaverStrategy,
    LocalStrategy,
    WaktaStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
