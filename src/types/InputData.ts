import {InputType} from '@/enums/InputType';
import {InputDataEntry} from '@/types/InputDataEntry';

export type InputData = {
  inputName: string,
  inputTypes: InputType,
  values: InputDataEntry[],
};
