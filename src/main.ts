import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router/router';
import store from './store';
import Element from 'element-ui';

const locale = require('element-ui/lib/locale/lang/en');
// tslint:disable-next-line
const VueAuth = require('@websanova/vue-auth');

Vue.config.productionTip = false;

// applying plugins
Vue.use(Element, {locale});
Vue.use(VueAxios, axios);

Vue.router = router;
Vue.axios.defaults.baseURL = process.env.API_URL;
Vue.prototype.baseUrl = Vue.axios.defaults.baseURL;

Vue.use(VueAuth, {
  auth: {
    request(req: Request, token: string) {
      (this as any).options.http._setHeaders.call(this, req, {
        Authorization: `Bearer ${token}`,
      });
    },
    response(res: any) {
      // Get Token from response body
      return res.data.token;
    },
  },
  authRedirect: '/login',
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: '/users/login', fetchUser: false},
  logoutData: {makeRequest: false},
  registerData: {url: '/users/register', method: 'POST', redirect: '/'},
  refreshData: {enabled: false},
  fetchData: {
    enabled: false,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
