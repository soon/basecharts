<template>
  <div class="layout__col-2-scroll layout__col-2-scroll--white-background">
    <div class="dashboard">
      <div v-for="block in blocks" :key="block.id" class="card-placeholder">
        <div class="block-buttons">
          <div class="block-button" @click="handleOpenForm(block)">
            <i class="fas fa-fw fa-edit"></i>
          </div>
          <div class="block-button" @click="handleClearBlock(block)">
            <i class="fas fa-fw fa-trash"></i>
          </div>
        </div>

        <DashboardChartBlock
          :config="block.config"
          :charts-components="chartsComponents"
        />
      </div>
      <Modal ref="editorFormModal">
        <BaseChartEditorForm
          :all-chart-types="allChartTypes"
          :charts-components="chartsComponents"
          :initial-config="currentBlock?.config"
          @update-config="handleUpdateConfig"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import BaseChartEditorForm from '../components/BaseChartEditorForm.vue'
import LineChart from '../components/charts/line/LineChart.vue'
import LineChartForm from '../components/charts/line/LineChartForm.vue'
import PieChart from '../components/charts/pie/PieChart.vue'
import PieChartForm from '../components/charts/pie/PieChartForm.vue'
import BarChart from '../components/charts/bar/BarChart.vue'
import BarChartForm from '../components/charts/bar/BarChartForm.vue'
import DashboardChartBlock from '../components/DashboardChartBlock.vue'
import Modal from '@basecharts/components/Modal.vue'

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers(
  'basecharts/chartEditor'
)

export default {
  components: {
    BaseChartEditorForm,
    DashboardChartBlock,
    Modal,
  },
  layout: 'app',
  data() {
    return {
      chartsComponents: {
        line: [LineChart, LineChartForm],
        bar: [BarChart, BarChartForm],
        pie: [PieChart, PieChartForm],
      },
      chartType: 'line',
      allChartTypes: [
        { name: 'Line', value: 'line' },
        { name: 'Bar', value: 'bar' },
        { name: 'Pie', value: 'pie' },
      ],
      apiUrl: '',
      apiResult: null,
      showModal: false,
      currentBlock: null,
      blocks: [
        {
          id: 0,
          config: {},
        },
        {
          id: 1,
          config: {},
        },
        {
          id: 2,
          config: {},
        },
        {
          id: 3,
          config: {},
        },
      ],
    }
  },
  computed: {
    ...mapState({
      editorConfig: 'config',
    }),
  },
  watch: {
    blocks: {
      deep: true,
      handler() {
        localStorage.setItem('dashboard.blocks', JSON.stringify(this.blocks))
      },
    },
  },
  created() {
    try {
      this.blocks = JSON.parse(localStorage.getItem('dashboard.blocks') ?? '')
    } catch {}
  },
  methods: {
    ...mapActions(['setConfig']),
    handleOpenForm(block) {
      this.currentBlock = block
      this.setConfig(block.config.config)
      this.$refs.editorFormModal.show()
    },
    handleClearBlock(block) {
      block.config = {}
    },
    handleUpdateConfig(config) {
      this.$refs.editorFormModal.hide()
      if (this.currentBlock != null) {
        this.currentBlock.config = config
      }
    },
  },
}
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1200px;
  /* You can adjust this value */
  margin: 0 auto;
}

.card-placeholder {
  width: 100%;
  height: 420px;
  padding: 10px 20px;
  border: 1px solid #b5b5b7;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.plus-symbol {
  font-size: 40px;
  opacity: 0.5;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.block-buttons {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  z-index: 1;
  display: flex;
}

.block-button {
  color: #b5b5b7;
  cursor: pointer;
}

.block-button:hover {
  color: black;
}
</style>
