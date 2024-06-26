// eslint-disable-next-line @typescript-eslint/no-unused-vars
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    auth: object;
    accessToken: string;
    refreshToken: string;
    user: any;
  }
}
