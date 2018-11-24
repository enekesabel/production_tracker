import {Component, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {DialogMixin} from '@/mixins/DialogMixin';
import {Machine} from '@/types/Machine';
import MachineSettingsForm from '../machine_settings_form/MachineSettingsForm';
import {Action} from 'vuex-class';

@Component({
  components: {MachineSettingsForm},
})
export default class MachineSettingsDialog extends mixins(DialogMixin) {
  @Prop({
    required: true,
  })
  private machine: Machine;

  private localMachine: Machine = null;

  @Action
  updateMachine: (machine: Machine) => Promise<any>;

  async save() {

    try {
      await this.updateMachine(this.localMachine);
      this.$message({
        type: 'success',
        message: 'Setting successfully saved',
      });
    } catch (e) {
      this.$message({
        type: 'error',
        message: 'An error occurred, settings might not be saved.',
      });
    } finally {
      this.close();
    }
  }

  @Watch('machine', {immediate: true})
  onUserChange(machine: Machine) {
    this.localMachine = machine;
    //  this.fetchUserPermissions(user.id);
  }

}
