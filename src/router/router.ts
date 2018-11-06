import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/Home.vue';
import {Routes} from './Routes';
import Users from '@/views/users/Users';
import Devices from '@/views/devices/Devices';
import Auth from '@/views/auth/Auth';
import LoginForm from '@/components/login_form/LoginForm';
import SignupForm from '@/components/signup_form/SignupForm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: Routes.HOME,
      component: Home,
    },
    {
      path: '/users',
      name: Routes.USERS,
      component: Users,
    },
    {
      path: '/devices',
      name: Routes.DEVICES,
      component: Devices,
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          redirect: {
            name: Routes.LOGIN,
          },
        },
        {
          path: '/login',
          name: Routes.LOGIN,
          component: LoginForm,
        },
        {
          path: '/login',
          name: Routes.SIGNUP,
          component: SignupForm,
        },
      ],
    },
  ],
});
