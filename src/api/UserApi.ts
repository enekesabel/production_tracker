import axios from 'axios';
import {User} from '@/types/User';

// tslint:disable-next-line
export const UserApi = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get('users');
    return response.data;
  },
};
