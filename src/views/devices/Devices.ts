import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {Machine} from '@/types/Machine';
import MachineSettingsDialog from '@/components/machine_settings_dialog/MachineSettingsDialog';
import MachineSettingsForm from '@/components/machine_settings_form/MachineSettingsForm';

@Component({
  components: {MachineSettingsDialog, MachineSettingsForm},
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

  private machineAddDialogVisible: boolean = false;
  private machineSettingsDialogVisible: boolean = false;
  private selectedMachine: Machine = null;
  private machineToAdd: Machine = {
    id: '',
    machineId: '',
    machineName: '',
  };

  created() {
    this.fetchMachines();
  }

  private async validateForm() {
    await (this.$refs.addMachineForm as MachineSettingsForm).validate();
  }

  private async addMachine() {
    try {
      await this.validateForm();
      await this.createMachine(this.machineToAdd);
      this.closeAddDialog();
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

  openAddDialog() {
    this.machineAddDialogVisible = true;
  }

  closeAddDialog() {
    this.machineAddDialogVisible = false;
  }

  @Watch('machineSettingsDialogVisible')
  onMachineSettingsDialogVisibilityChange(machineSettingsDialogVisible: boolean) {
    if (!machineSettingsDialogVisible) {
      this.selectedMachine = null;
    }
  }

}
