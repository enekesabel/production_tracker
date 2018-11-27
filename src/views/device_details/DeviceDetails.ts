import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Machine} from '@/types/Machine';
import {MachineData} from '@/types/MachineData';
import {MachineDataApi} from '@/api/MachineDataApi';
import {Action, Getter} from 'vuex-class';
import {InputType} from '@/enums/InputType';
import {InputData} from '@/types/InputData';
import Diagram from '@/components/diagram/Diagram';

@Component({
  components: {Diagram},
})
export default class DeviceDetails extends Vue {

  @Prop({
    type: String,
    required: true,
  })
  private deviceId: string;

  @Getter
  private getMachineById: (machineId: string) => Machine;
  @Action
  private fetchMachine: (machineId: string) => Promise<void>;

  private machineData: MachineData = null;

  private get machine(): Machine {
    if (!this.deviceId) {
      return null;
    }
    return this.getMachineById(this.deviceId) || null;
  }

  get inputs(): InputData[] {
    if (!this.machineData) {
      return [];
    }
    return this.machineData.inputs;
  }

  get inputTypes(): {[k in InputType]?: number} {
    return Object.keys(InputType).reduce((p, c: string) => {
      const value = InputType[c as any as number];
      if (typeof value === 'number') {
        return {...p, ...{[c]: value}};
      }
      return p;
    }, {});
  }

  @Watch('deviceId', {immediate: true})
  async onDeviceIdChange(deviceId: string) {
    if (!this.machine) {
      this.fetchMachine(deviceId);
    }
    this.machineData = await MachineDataApi.getDataOfMachine(deviceId);
  }
}
