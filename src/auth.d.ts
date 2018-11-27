import {VueRouter} from 'vue-router/types/router';

declare module 'vue/types/vue' {

  interface Vue {
    $auth: any;
  }

  interface VueConstructor {
    router: VueRouter;
  }
}
