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
  @Action
  private deleteMachine: (id: string) => Promise<void>;

  private dialogVisible: boolean = false;
  private machineToAdd: Machine = {
    id: '',
    machineId: '',
    machineName: '',
  };
  private rules = {
    id: [
      {required: true, message: 'Please add a name', trigger: 'blur'},
    ],
    machineName: [
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

  private async detachMachine(id: string) {
    console.log('detachMachine');
    try {
      await this.$confirm('This operation will detach the machine. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        });

      await this.deleteMachine(id);
      this.$message({
        type: 'success',
        message: 'Detaching completed',
      });
    } catch (e) {
      this.$message({
        type: 'info',
        message: 'Detaching canceled',
      });
    }
  }

  private openDialog() {
    this.dialogVisible = true;
  }

  private closeDialog() {
    this.dialogVisible = false;
  }
}
