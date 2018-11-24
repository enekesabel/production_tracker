import {Component, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {DialogMixin} from '@/mixins/DialogMixin';
import PermissionEditor from '@/components/permission_editor/PermissionEditor';
import {Machine} from '@/types/Machine';

@Component({
  components: {PermissionEditor},
})
export default class MachineSettingsDialog extends mixins(DialogMixin) {

  @Prop({
    required: true,
  })
  private machine: Machine;

  async save() {

    try {

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
    //  this.fetchUserPermissions(user.id);
  }

}
