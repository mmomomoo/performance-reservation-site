import { User } from '../users/user.interface';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
