import Component, {mixins} from 'vue-class-component';
import {mixins as chartjsMixins} from 'vue-chartjs';
import {InputData} from '@/types/InputData';
import {InputType} from '@/enums/InputType';
import moment from 'moment';
import {Prop} from 'vue-property-decorator';

@Component
export default class DiagramMixin extends mixins(chartjsMixins.reactiveData) {

  @Prop({
    required: true,
  })
  protected inputData: InputData;

  @Prop({
    type: Number,
  })
  private min: number;

  @Prop({
    type: Number,
  })
  private max: number;

  protected options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: this.min || 0,
          max: this.max,
        },
      }],
    },
    responsive: false,
    maintainAspectRatio: false,
  };

  protected getLabel(): string {
    return InputType[this.inputData.inputTypes];
  }

  protected createLabels(): string[] {
    return this.inputData.values.map((v) => {
      return moment(v.timestamp).format('hh:mm:ss');
    });
  }

  protected createData(): number[] {
    return this.inputData.values.map((v) => {
      return v.value;
    });
  }

}
