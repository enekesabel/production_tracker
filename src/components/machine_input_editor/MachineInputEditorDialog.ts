import {Component, Model, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {DialogMixin} from '@/mixins/DialogMixin';
import {MachineInput} from '@/types/MachineInput';
import {GPIOPin} from '@/enums/GPIOPin';
import {Form} from 'element-ui';
import {InputType} from '@/enums/InputType';

@Component
export default class MachineInputEditorDialog extends mixins(DialogMixin) {

  @Model('update:input')
  @Prop({
    type: Array,
    required: true,
  })
  private input: MachineInput;

  @Prop({
    type: String,
    required: true,
  })
  private title: string;

  @Prop({
    type: Array,
    required: true,
  })
  private availablePins: GPIOPin[];

  private localInput: MachineInput = null;
  private rules = {
    name: [
      {required: true, message: 'Please provide a name', trigger: 'blur'},
    ],
    gpioPin: [
      {required: true, message: 'Please select a pin', trigger: 'change'},
    ],
    inputType: [
      {required: true, message: 'Please select an input type', trigger: 'change'},
    ],
  };

  get inputTypes(): {[k in InputType]?: number} {
    return Object.keys(InputType).reduce((p, c: string) => {
      const value = InputType[c as any as number];
      if (typeof value === 'number') {
        return {...p, ...{[c]: value}};
      }
      return p;
    }, {});
  }

  async save() {
    const form = this.$refs.form as Form;
    try {
      await form.validate();
      this.clearForm();
      this.$emit('update:input', this.localInput);
      this.close();
    } catch (e) {

    }
  }

  clearForm() {
    const form = this.$refs.form as Form;
    form.clearValidate();
  }

  cancel() {
    this.clearForm();
    this.close();
  }

  @Watch('input', {immediate: true})
  onInputChanged(input: MachineInput) {
    if (input === this.localInput) {
      return;
    }
    this.localInput = input;
  }

}
