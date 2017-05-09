import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  watch: {
    'options': {
      handler (newOption, oldOption) {
        this._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
