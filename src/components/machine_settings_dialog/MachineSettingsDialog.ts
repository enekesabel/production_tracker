import {Component, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {DialogMixin} from '@/mixins/DialogMixin';
import {Machine} from '@/types/Machine';
import MachineSettingsForm from '../machine_settings_form/MachineSettingsForm';
import {Action} from 'vuex-class';
import MachineInputTable from '@/components/machine_input_table/MachineInputTable';

@Component({
  components: {MachineSettingsForm, MachineInputTable},
})
export default class MachineSettingsDialog extends mixins(DialogMixin) {
  @Prop({
    required: true,
  })
  private machine: Machine;
  @Action
  updateMachine: (machine: Machine) => Promise<any>;

  private localMachine: Machine = null;

  async save() {

    try {
      const inputTable = this.$refs.inputTable as MachineInputTable;
      await Promise.all([
        this.updateMachine(this.localMachine),
        inputTable.save(),
      ]);
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
  onMachineChange(machine: Machine) {
    if (!machine) {
      return;
    }
    this.localMachine = {...machine};
  }

}
