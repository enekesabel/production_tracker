import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {Machine} from '@/types/Machine';
import {ElForm} from 'element-ui/types/form';

@Component
export default class Devices extends Vue {

  @State
  private machines: Machine[];
  @Action
  private fetchMachines: () => Promise<void>;
  @Action
  private createMachine: (machine: Machine) => Promise<void>;

  private dialogVisible: boolean = false;
  private machineToAdd: Machine = {
    MachineId: '',
    MachineName: '',
  };
  private rules = {
    MachineId: [
      {required: true, message: 'Please add a name', trigger: 'blur'},
    ],
    MachineName: [
      {required: true, message: 'Please add an id', trigger: 'blur'},
    ],
  };

  created() {
    this.fetchMachines();
  }

  private async validateForm() {
    await (this.$refs.addMachineForm as ElForm).validate();
  }

  private async addMachine() {
    try {
      await this.validateForm();
      await this.createMachine(this.machineToAdd);
      this.closeDialog();
    } catch (e) {
    }
  }

  private openDialog() {
    this.dialogVisible = true;
  }

  private closeDialog() {
    this.dialogVisible = false;
  }
}
