import {Component, Vue} from 'vue-property-decorator';
import {Form} from 'element-ui';
import {Routes} from '@/router/Routes';

@Component
export default class LoginForm extends Vue {
  private loginForm = {
    email: '',
    password: '',
  };

  private rules = {
    email: [
      {required: true, message: 'Please input your email address', trigger: 'blur'},
      {type: 'email', message: 'Please input a valid email address', trigger: 'blur'},
    ],
    password: [
      {required: true, message: 'Please input your password'},
    ],
  };

  Routes = Routes;

  login() {
    (this.$refs.loginForm as Form).validate((valid) => {
      if (valid) {
        this.$auth.login({
          data: this.loginForm,
          headers: {
            'Content-type': 'application/json',
          },
          success(res: any) {
            Vue.axios.get(`/users/${res.data.id}`).then((response) => {
              this.$auth.user(response.data);
            });
          },
          error(err: Error) {
            this.$message({
              type: 'error',
              message: 'Wrong username or password',
            });
          },
        });
      } else {
        return false;
      }
    });
  }
}
