import axios from 'axios';
import {MachineData} from '@/types/MachineData';

// tslint:disable-next-line
export const MachineDataApi = {
  async getDataOfMachine(machineId: string): Promise<MachineData> {
    const response = await axios.get(`datacollection/${machineId}`);
    return response.data;
  },
};
