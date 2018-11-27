import {Line} from 'vue-chartjs';
import Component, {mixins} from 'vue-class-component';
import DiagramMixin from '@/mixins/DiagramMixin';

@Component
export default class LineChart extends mixins(Line, DiagramMixin) {

  private chartData = {
    labels: this.createLabels(),
    datasets: [{
      label: this.inputData.inputName,
      data: this.createData(),
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderColor: 'red',
      cubicInterpolationMode: 'monotone',
    }],
  };

  mounted() {
    this.renderChart(this.chartData, this.options);
  }

}
