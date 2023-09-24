<template>
    <div ref="chartDom" :style="{ width: '100%', height: '400px' }"></div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.initChart();
    },
    watch: {
        options: {
            deep: true,
            handler() {
                this.chart.setOption(this.options);
            }
        }
    },
    methods: {
        initChart() {
            const chartDom = this.$refs.chartDom;
            this.chart = echarts.init(chartDom);
            this.chart.setOption(this.options);

        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
};
</script>  
  