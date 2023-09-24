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
    fields: Array,
  },
  computed: {
    idToField() {
      return new Map(this.fields.map((x) => [x.id, x]))
    },
    options() {
      const { xAxisFieldId, yAxisSeries, orientation } = this.config
      if (
        xAxisFieldId == null ||
        !Array.isArray(yAxisSeries) ||
        this.gridData?.results == null
      ) {
        return {}
      }

      const isVertical = (orientation ?? 'vertical') === 'vertical'
      const categoryData = this.gridData.results.map(
        (row) => row[`field_${xAxisFieldId}`]
      )

      const series = yAxisSeries
        .filter((x) => x.fieldId != null)
        .map((x) => ({
          data: this.gridData.results.map((row) => row[`field_${x.fieldId}`]),
          type: 'bar',
          name: this.idToField.get(x.fieldId)?.name ?? '',
        }))

      const legendData = series.map((x) => x.name)

      return {
        title: {
          text: getChartTitle(this.view),
        },
        legend: {
          data: legendData,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: isVertical
          ? {
              type: 'category',
              data: categoryData,
            }
          : {
              type: 'value',
            },
        yAxis: isVertical
          ? {
              type: 'value',
            }
          : {
              type: 'category',
              data: categoryData,
            },
        series,
      }
    },
  },
}
</script>
