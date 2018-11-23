import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {User} from '@/types/User';

@Component
export default class Users extends Vue {

  @State
  private users: User[];
  @Action
  private fetchUsers: () => {};

  created() {
    this.fetchUsers();
  }

}
