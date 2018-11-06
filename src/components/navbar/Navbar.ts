import {Component, Vue} from 'vue-property-decorator';
import {Routes} from '@/router/Routes';

@Component
export default class Navbar extends Vue {

  Routes = Routes;

}
