import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  async serializeUser(
    user: User,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    console.log(user, 'serializeUser'); // 테스트 시 확인
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    const response = await this.userService.findById(String(payload.id));
    console.log(response, 'deserializeUser'); // 테스트 시 확인
    const user = JSON.parse(JSON.stringify(response));
    if (user) delete user.password;
    return user ? done(null, user) : done(null, null);
  }
}
