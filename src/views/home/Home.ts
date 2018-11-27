import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {Machine} from '@/types/Machine';

@Component
export default class Home extends Vue {

  @State
  private machines: Machine[];
  @Action
  private fetchMachines: () => void;

  created() {
    this.fetchMachines();
  }

}
