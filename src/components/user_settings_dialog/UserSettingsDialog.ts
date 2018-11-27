import {Component, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {DialogMixin} from '@/mixins/DialogMixin';
import PermissionEditor from '@/components/permission_editor/PermissionEditor';
import {User} from '@/types/User';
import {Permission} from '@/types/Permission';
import {PermissionApi} from '@/api/PermissionApi';
import {PermissionType} from '@/enums/PermissionType';

@Component({
  components: {PermissionEditor},
})
export default class UserSettingsDialog extends mixins(DialogMixin) {

  @Prop({
    required: true,
  })
  private user: User;

  private userPermissions: Permission[] = [];
  private userPermissionsTypes: PermissionType[] = [];
  private oldUserPermissionsTypes: PermissionType[] = [];

  async save() {
    try {
      await this.savePermissions();
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

  get removedPermissionsTypes(): PermissionType[] {
    return this.oldUserPermissionsTypes.filter(o => this.userPermissionsTypes.indexOf(o) === -1);
  }

  get addedPermissionsTypes(): PermissionType[] {
    return this.userPermissionsTypes.filter(o => this.oldUserPermissionsTypes.indexOf(o) === -1);
  }

  get removedPermissions(): Permission[] {
    return this.userPermissions.filter((p) => {
      return this.removedPermissionsTypes.indexOf(p.permissionGranted) !== -1;
    });
  }

  async savePermissions() {
    let promises: Promise<any>[] = this.removedPermissions.map((p) => {
      return PermissionApi.deletePermission(p.id);
    });
    promises = [...promises, ...this.addedPermissionsTypes.map((p) => {
      return PermissionApi.grantPermission(this.user.id, p);
    })];

    await Promise.all(promises);
  }

  async fetchUserPermissions(userId: string) {
    try {
      this.userPermissions = await PermissionApi.getUserPermissions(userId);
      this.userPermissionsTypes = this.userPermissions.map(p => p.permissionGranted);
      this.oldUserPermissionsTypes = [...this.userPermissionsTypes];
    } catch (e) {

    }
  }

  @Watch('user', {immediate: true})
  onUserChange(user: User) {
    this.fetchUserPermissions(user.id);
  }

}
