import {Prop} from 'vue-property-decorator';
import {DiagramType} from '@/enums/DiagramType';
import Component from 'vue-class-component';
import Vue from 'vue';
import BarChart from '@/components/bar_chart/BarChart';
import LineChart from '@/components/line_chart/LineChart';
import {InputData} from '@/types/InputData';
import {InputType} from '@/enums/InputType';

@Component({
  components: {LineChart, BarChart},
})
export default class Diagram extends Vue {

  @Prop({
    required: true,
  })
  protected inputData: InputData;

  get type(): string {
    const inputType = this.inputData.inputTypes;
    switch (inputType) {
      case InputType.COUNTER:
        return 'bar-chart';
      case InputType.VOLTAGE:
        return 'line-chart';
      case InputType.FAILURE:
        return 'bar-chart';
    }
  }

  get scrollable(): boolean {
    switch (this.type) {
      case DiagramType.BAR_CHART:
        return true;
      case DiagramType.LINE_CHART:
        return true;
    }
  }

  get styles() {
    if (!this.scrollable) {
      return {};
    }
    return {
      'overflow-x': 'scroll',
    };
  }

  get cssClasses() {
    if (!this.scrollable) {
      return;
    }
    return 'scrollable;';
  }

  get width(): number {
    if (!this.scrollable) {
      return;
    }
    return 6000;
  }

  get maxValue(): number {
    if(this.inputData.inputTypes === InputType.FAILURE){
      return 2;
    }
  }

  get minValue(): number {
    if (this.type !== DiagramType.LINE_CHART) {
      return 0;
    }

    const min = Math.min(...this.inputData.values.map(v => v.value));
    const max = Math.max(...this.inputData.values.map(v => v.value));
    const diff = max - min;
    return min - diff / 4;
  }

}
