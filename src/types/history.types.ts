import { User } from './user.types';

export interface History {
  id: string;
  date: Date;
  description: string;
  action: string;
  user: User;
}
