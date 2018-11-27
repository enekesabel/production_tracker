import {Component, Vue} from 'vue-property-decorator';
import {Form} from 'element-ui';
import {Routes} from '@/router/Routes';

@Component
export default class SignupForm extends Vue {

  private signupForm = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  private rules = {
    email: [
      {required: true, message: 'Please input your email address', trigger: 'blur'},
      {type: 'email', message: 'Please input a valid email address', trigger: 'blur'},
    ],
    name: [
      {required: true, message: 'Please input your full name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
    password: [
      {required: true, message: 'Please input your password'},
    ],
    passwordConfirm: [
      {validator: this.validatePass, trigger: 'blur'},
      {required: true, message: 'Please input password confirmation'},
    ],
  };

  Routes = Routes;

  validatePass(rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== this.signupForm.password) {
      callback(new Error('Two inputs don\'t match!'));
    } else {
      callback();
    }
  }

  signup() {
    (this.$refs.signupForm as Form).validate((valid) => {
      if (valid) {
        this.$auth.register({
          headers: {
            'Content-Type': 'application/json',
          },
          data: this.signupForm,
          success (response: any) {
            console.log(response);
          },
          error (err : any) {
            console.log(err);
            if (err.response) {
              this.errors = err.response.data.error.errors;
            } else {
              // Something happened in setting up the request that triggered an Error
              this.errors.unknown = err.message;
            }
          },
          autoLogin: true,
          rememberMe: true,
          redirect: {name: Routes.HOME},
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
