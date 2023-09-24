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
      const { xAxisFieldId, yAxisFieldId } = this.config
      if (!xAxisFieldId || !yAxisFieldId || !this.gridData?.results) {
        return {}
      }

      const values = this.gridData.results.map((row) => ({
        name: row[`field_${xAxisFieldId}`],
        value: row[`field_${yAxisFieldId}`],
      }))

      return {
        title: {
          text: getChartTitle(this.view),
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Sales',
            type: 'pie',
            data: values,
          },
        ],
      }
    },
  },
}
</script>
