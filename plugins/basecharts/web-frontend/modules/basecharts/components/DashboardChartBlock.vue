<template>
  <ChartDataProvider
    :chart-component="ChartComponent"
    :table-id="config.tableId"
    :view-id="config.viewId"
    :config="config.config"
  />
</template>

<script>
import ChartDataProvider from '../components/ChartDataProvider.vue'

export default {
  components: {
    ChartDataProvider,
  },
  props: ['config', 'chartsComponents'],
  computed: {
    ChartComponent() {
      return this.chartsComponents[this.config.type]?.[0]
    },
  },
}
</script>
