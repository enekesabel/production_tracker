import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

@Component
export class VisibilitySyncMixin extends Vue {

  @Prop({
    required: true,
  })
  protected visible: boolean;

  protected localVisible: boolean = false;

  @Watch('visible', {immediate: true})
  onVisibleChange(visible: boolean) {
    if (visible !== this.localVisible) {
      this.localVisible = visible;
    }
  }

  @Watch('localVisible')
  onLocalVisibleChange(localVisible: boolean) {
    if (localVisible !== this.visible) {
      this.$emit('update:visible', localVisible)
    }
  }

}