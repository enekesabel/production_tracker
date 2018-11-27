import axios from 'axios';
import {Machine} from '@/types/Machine';

// tslint:disable-next-line
export const MachineApi = {
  async getMachine(id:string): Promise<Machine> {
    const response = await axios.get(`machines/${id}`);
    return response.data;
  },
  async getMachines(): Promise<Machine[]> {
    const response = await axios.get('machines');
    return response.data;
  },
  async createMachine(machine: Machine): Promise<Machine> {
    const response = await axios.post('machines', machine);
    return response.data;
  },
  async updateMachine(machine: Machine): Promise<Machine> {
    const response = await axios.put('machines', machine);
    return response.data;
  },
  async deleteMachine(id: string) {
    return axios.delete(`machines/${id}`);
  },
};
