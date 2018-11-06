import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import Element from 'element-ui';
const locale = require('element-ui/lib/locale/lang/en');

Vue.config.productionTip = false;

// applying plugins
Vue.use(Element, {locale});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
