<template>
  <div>
    <ChartSetupForm>
      <template #chart>
        <component
          :is="ChartComponent"
          v-if="chartDataLoaded"
          :grid-data="gridData"
          :config="config"
          :view="selectedView"
          :fields="fields"
        />
        <span v-else>{{ message }}</span>
      </template>

      <template #form>
        <form @submit.prevent="">
          <VerticalSpacer>
            <FormField label="Company">
              <Dropdown
                v-model="selectedApplication"
                placeholder="Select company"
              >
                <DropdownItem
                  v-for="app in applications"
                  :key="app.id"
                  :name="app.name"
                  :value="app.id"
                >
                </DropdownItem>
              </Dropdown>
            </FormField>

            <FormField label="Table">
              <Dropdown v-model="selectedTable" placeholder="Select table">
                <DropdownItem
                  v-for="table in tables"
                  :key="table.id"
                  :name="table.name"
                  :value="table.id"
                >
                </DropdownItem>
              </Dropdown>
            </FormField>

            <FormField label="View">
              <Dropdown v-model="selectedViewId" placeholder="Select view">
                <DropdownItem
                  v-for="view in views"
                  :key="view.id"
                  :name="view.name"
                  :value="view.id"
                >
                </DropdownItem>
              </Dropdown>
            </FormField>

            <FormField label="Type">
              <Dropdown v-model="chartType" placeholder="Select chart type">
                <DropdownItem
                  v-for="t in allChartTypes"
                  :key="t.value"
                  :name="t.name"
                  :value="t.value"
                >
                </DropdownItem>
              </Dropdown>
            </FormField>
            <component
              :is="ChartFormComponent"
              :grid-data="gridData"
              :fields="fields"
              :selected-view="selectedView"
            />
          </VerticalSpacer>
        </form>
      </template>
    </ChartSetupForm>
    <div class="actions">
      <Button @click="handleSave">Save</Button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Button from 'baserow/modules/core/components/Button.vue'
import Dropdown from 'baserow/modules/core/components/Dropdown.vue'
import DropdownItem from 'baserow/modules/core/components/DropdownItem.vue'
import ChartSetupForm from '../components/ChartSetupForm.vue'
import VerticalSpacer from '../components/VerticalSpacer.vue'
import FormField from '@basecharts/components/FormField.vue'

const { mapState } = createNamespacedHelpers('basecharts/chartEditor')

export default {
  components: {
    Button,
    ChartSetupForm,
    VerticalSpacer,
    Dropdown,
    DropdownItem,
    FormField,
  },
  props: {
    chartOptions: Object,
    allChartTypes: Array,
    initialConfig: Object,
    chartsComponents: Object,
  },
  data() {
    return {
      applications: [],
      tables: [],
      views: [],
      fields: [],
      selectedApplication: null,
      selectedTable: null,
      selectedViewId: null,
      gridData: {},
      xAxisField: null,
      yAxisField: null,
      chartType: 'line',
    }
  },
  computed: {
    idToView() {
      const result = new Map()
      for (const view of this.views) {
        result.set(view.id, view)
      }
      return result
    },
    selectedView() {
      return this.idToView.get(this.selectedViewId)
    },
    ChartComponent() {
      return this.chartsComponents[this.chartType]?.[0]
    },
    ChartFormComponent() {
      return this.chartsComponents[this.chartType]?.[1]
    },
    chartDataLoaded() {
      return (
        this.selectedView != null &&
        this.gridData.results != null &&
        this.config != null
      )
    },
    message() {
      if (this.selectedApplication == null) {
        return 'Select company'
      }
      if (this.selectedTable == null) {
        return 'Select table'
      }
      if (this.selectedViewId == null) {
        return 'Select view'
      }
      if (this.chartType == null) {
        return 'Select chart type'
      }
      if (!this.chartDataLoaded) {
        return 'Loading...'
      }
      return ''
    },
    ...mapState(['config']),
  },
  watch: {
    selectedApplication: 'loadTables',
    selectedTable: 'loadTableViews',
    selectedViewId() {
      this.loadGridView()
      this.loadTableFields()
    },
    initialConfig: {
      immediate: true,
      handler(config) {
        this.selectedTable = config?.tableId
        this.selectedViewId = config?.viewId
        this.chartType = config?.type
      },
    },
  },
  mounted() {
    this.loadApplications()
  },
  methods: {
    handleSave() {
      this.$emit('update-config', {
        tableId: this.selectedTable,
        viewId: this.selectedView.id,
        type: this.chartType,
        config: this.config,
      })
    },

    async loadGridView() {
      if (this.selectedViewId != null) {
        try {
          const response = await this.$client.get(
            `/database/views/grid/${this.selectedViewId}/`
          )
          this.gridData = response.data
        } catch (error) {
          console.error('Error loading grid view:', error)
        }
      }
    },
    async loadApplications() {
      try {
        const response = await this.$client.get('/applications/')
        this.applications = response.data
        if (this.applications.length > 0) {
          this.selectedApplication = this.applications[0].id
        }
      } catch (error) {
        console.error('Error loading applications:', error)
      }
    },
    loadTables() {
      this.tables = this.selectedApplication
        ? this.applications.find((app) => app.id === this.selectedApplication)
            .tables
        : []
      if (
        this.tables.length > 0 &&
        this.tables.find((x) => x.id === this.selectedTable) == null
      ) {
        this.selectedTable = this.tables[0].id
      }
    },
    async loadTableViews() {
      if (this.selectedTable) {
        try {
          const response = await this.$client.get(
            `/database/views/table/${this.selectedTable}/`,
            { type: 'grid' }
          )
          this.views = response.data
          if (
            this.views.length > 0 &&
            this.views.find((x) => x.id === this.selectedViewId) == null
          ) {
            this.selectedViewId = this.views[0].id
          }
        } catch (error) {
          console.error('Error loading table views:', error)
        }
      }
    },
    async loadTableFields() {
      if (this.selectedTable) {
        try {
          const response = await this.$client.get(
            `/database/fields/table/${this.selectedTable}/`
          )
          this.fields = response.data
        } catch (error) {
          console.error('Error loading table fields:', error)
        }
      }
    },
  },
}
</script>

<style scoped>
.actions {
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
