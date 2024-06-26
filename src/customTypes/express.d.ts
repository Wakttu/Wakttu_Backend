import { reqUserType } from '../repositories/UserRepository';

declare global {
  namespace Express {
    interface User extends reqUserType {
      id: number | string;
      name: string;
      provider: string;
      accessToken?: string;
      refreshToken?: string;
    }
    interface Request {
      user?: User;
    }
  }
}
