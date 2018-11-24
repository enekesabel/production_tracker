import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {User} from '@/types/User';
import UserSettingsDialog from '@/components/user_settings_dialog/UserSettingsDialog';

@Component({
  components: {UserSettingsDialog},
})
export default class Users extends Vue {

  @State
  private users: User[];
  @Action
  private fetchUsers: () => {};

  private settingsDialogVisible: boolean = false;
  private selectedUser: User = null;

  created() {
    this.fetchUsers();
  }

  private openSettings(user: User) {
    this.selectedUser = user;
    this.settingsDialogVisible = true;
  }

  @Watch('settingsDialogVisible')
  onSettingsDialogVisibilityChange(settingsDialogVisible: boolean) {
    if (!settingsDialogVisible) {
      this.selectedUser = null;
    }
  }
}
