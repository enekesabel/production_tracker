import axios from 'axios';
import {MachineInput} from '@/types/MachineInput';

// tslint:disable-next-line
export const MachineInputApi = {
  async getInputsOfMachine(machineId: string): Promise<MachineInput[]> {
    const response = await axios.get(`machinedata/${machineId}`);
    return response.data;
  },
  async putMachineInput(machineInput: MachineInput): Promise<MachineInput> {
    const response = await axios.put('machinedata', machineInput);
    return response.data;
  },
  async deleteMachineInput(id: string) {
    return axios.delete(`machinedata/${id}`);
  },
};
