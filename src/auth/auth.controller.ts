import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './naver-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalGuard } from './local-auth.guard';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IsLoginedGuard } from './isLogined-auth.guard';
import { WaktaAuthGuard } from './wakta-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Oauth Naver Login' })
  @UseGuards(NaverAuthGuard)
  @UseGuards(IsLoginedGuard)
  @Get('naver')
  async naverLogin(): Promise<void> {}

  @ApiOperation({ summary: 'Oauth Naver login Callback' })
  @UseGuards(NaverAuthGuard)
  @Get('naver/callback')
  async naverLoginCallback(@Req() req, @Res() res): Promise<void> {
    const user = req.user;
    await this.authService.OAuthLogin(user);
    return res.redirect('/list.html');
  }

  @ApiOperation({ summary: 'logout' })
  @Get('logout')
  logout(@Req() request: Request): Promise<any> {
    return this.authService.logout(request);
  }

  @ApiOperation({ summary: 'Local Login' })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @UseGuards(LocalGuard)
  @UseGuards(IsLoginedGuard)
  @Post('login')
  async localLogin(@Req() req: Request): Promise<any> {
    const json = JSON.parse(JSON.stringify(req.user));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = json;
    return user;
  }

  @ApiOperation({ summary: 'Local Signup' })
  @ApiBody({
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @UseGuards(IsLoginedGuard)
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<any> {
    return await this.authService.signup(user);
  }

  @ApiOperation({ summary: 'check to login User' })
  @Get('status')
  async user(@Req() req: any) {
    if (req.user) {
      return {
        data: req.user,
        msg: 'Authenticated',
      };
    } else {
      return {
        msg: 'Not Authenticated',
      };
    }
  }

  @ApiOperation({ summary: 'check duplicate inspection of id' })
  @ApiBody({
    schema: {
      properties: {
        id: { type: 'string' },
      },
    },
  })
  @Post('check/id')
  async checkId(@Body('id') id: string): Promise<any> {
    return await this.authService.checkId(id);
  }

  @ApiOperation({ summary: 'check duplicate inspection of name' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  @Post('check/name')
  async checkName(@Body('name') name: string): Promise<any> {
    return await this.authService.checkName(name);
  }

  @UseGuards(WaktaAuthGuard)
  @Get('wakta')
  async waktaLogin(): Promise<any> {}

  @UseGuards(WaktaAuthGuard)
  @Get('wakta/callback')
  async waktaCallback(@Query() query, @Req() req: Request) {
    const user = req.user;
    const { accessToken, refreshToken } = user;

    delete user['accessToken'];

    console.log(user);
    await this.authService.OAuthLogin(user);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
