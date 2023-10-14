<template>
  <EChartComponent :options="options" />
</template>

<script>
import EChartComponent from '../EChartComponent.vue'
import { getChartTitle } from '@basecharts/components/charts/utils.js'

export default {
  components: {
    EChartComponent,
  },
  props: {
    gridData: Object,
    config: Object,
    view: Object,
  },
  computed: {
    options() {
      const { xAxisFieldId, yAxisFieldId, labelFieldId } = this.config
      if (!xAxisFieldId || !yAxisFieldId || !this.gridData?.results) {
        return {}
      }

      const data = this.gridData.results.map((row) => [
        row[`field_${xAxisFieldId}`],
        row[`field_${yAxisFieldId}`],
      ])

      const labels = this.gridData.results.map(
        (row) => row[`field_${labelFieldId ?? xAxisFieldId}`]
      )
      return {
        title: {
          text: getChartTitle(this.view),
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const { dataIndex, data } = params[0] ?? params
            if (dataIndex == null || data == null) {
              return ''
            }
            return `${labels[dataIndex]}: ${data?.[1]}`
          },
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 10,
            data,
            type: 'scatter',
          },
        ],
      }
    },
  },
}
</script>
