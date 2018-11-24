import Component, {mixins} from 'vue-class-component';
import {Model, Prop} from 'vue-property-decorator';
import {VisibilitySyncMixin} from './VisibilitySyncMixin';

@Component
export class DialogMixin extends mixins(VisibilitySyncMixin) {

  @Model('update:visible')
  @Prop({
    default: false,
  })
  protected visible: boolean;

  open() {
    if (!this.localVisible) {
      this.localVisible = true;
    }
  }

  close() {
    if (this.localVisible) {
      this.localVisible = false;
    }
  }

}