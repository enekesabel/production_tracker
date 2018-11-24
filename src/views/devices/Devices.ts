import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {Machine} from '@/types/Machine';
import {ElForm} from 'element-ui/types/form';
import MachineSettingsDialog from '@/components/machine_settings_dialog/MachineSettingsDialog';

@Component({
  components: {MachineSettingsDialog},
})
export default class Devices extends Vue {

  @State
  private machines: Machine[];
  @Action
  private fetchMachines: () => Promise<void>;
  @Action
  private createMachine: (machine: Machine) => Promise<void>;
  @Action
  private deleteMachine: (id: string) => Promise<void>;

  private machineDeleteDialogVisible: boolean = false;
  private machineSettingsDialogVisible: boolean = false;
  private selectedMachine: Machine = null;
  private machineToAdd: Machine = {
    id: '',
    machineId: '',
    machineName: '',
  };
  private rules = {
    machineId: [
      {required: true, message: 'Please provide a name', trigger: 'blur'},
    ],
    machineName: [
      {required: true, message: 'Please provide an id', trigger: 'blur'},
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
      this.closeDeleteDialog();
    } catch (e) {
    }
  }

  private configureMachine(machine: Machine) {
    this.machineSettingsDialogVisible = true;
    this.selectedMachine = machine;
  }

  private async detachMachine(id: string) {
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

  openDeleteDialog() {
    this.machineDeleteDialogVisible = true;
  }

  closeDeleteDialog() {
    this.machineDeleteDialogVisible = false;
  }

  @Watch('machineSettingsDialogVisible')
  onMachineSettingsDialogVisibilityChange(machineSettingsDialogVisible: boolean) {
    if (!machineSettingsDialogVisible) {
      this.selectedMachine = null;
    }
  }

}
