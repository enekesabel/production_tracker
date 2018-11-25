import {InputType} from '@/enums/InputType';

export type MachineInput = {
  id?: string,
  machineId: string,
  name: string,
  gpioPin: number,
  inputType: InputType,
};
