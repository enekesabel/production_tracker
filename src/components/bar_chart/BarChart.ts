import {Bar} from 'vue-chartjs';
import Component, {mixins} from 'vue-class-component';
import DiagramMixin from '@/mixins/DiagramMixin';

@Component
export default class BarChart extends mixins(Bar, DiagramMixin) {

  private chartData = {
    labels: this.createLabels(),
    datasets: [{
      label: this.inputData.inputName,
      data: this.createData(),
      borderWidth: 1,
    }],
  };

  mounted() {
    this.renderChart(this.chartData, this.options);
  }

}
