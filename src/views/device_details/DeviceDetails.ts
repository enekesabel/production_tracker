import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Machine} from '@/types/Machine';
import {MachineData} from '@/types/MachineData';
import {MachineDataApi} from '@/api/MachineDataApi';

@Component
export default class DeviceDetails extends Vue {

  @Prop({
    type: String,
    required: true,
  })
  private deviceId: string;
  private machine: Machine = null;
  private machineData: MachineData = null;

  @Watch('deviceId', {immediate: true})
  async onDeviceIdChange(deviceId: string) {
    this.machineData = await MachineDataApi.getDataOfMachine(deviceId);
  }
}
