import {Component, Vue} from 'vue-property-decorator';
import {Routes} from '@/router/Routes';
import {PermissionApi} from '@/api/PermissionApi';

@Component
export default class Navbar extends Vue {

  Routes = Routes;

  logout() {
    this.$auth.logout({
      redirect: '/login',
    });
  }

  async requestAdminRights() {
    try {
      await PermissionApi.grantSuperUserPermission();
      this.$message({
        type: 'success',
        message: 'Admin rights granted',
      });
    } catch (e) {
      this.$message({
        type: 'error',
        message: 'Requesting admin rights unsuccessful',
      });
    }
  }

}
