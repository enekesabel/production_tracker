import {Machine} from 'src/types/Machine';
import {User} from '@/types/User';

export interface IRootState {
  machines: Machine[];
  users: User[];
}
