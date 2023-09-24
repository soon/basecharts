<template>
  <component
    :is="ChartComponent"
    v-if="loaded"
    :table="table"
    :view="view"
    :grid-data="gridData"
    :config="config"
    :fields="fields"
  />
  <span v-else>{{ message }}</span>
</template>

<script>
export default {
  props: {
    ChartComponent: Object,
    tableId: Number,
    viewId: Number,
    config: Object,
  },
  data() {
    return {
      table: null,
      gridData: null,
      view: null,
      fields: null,
    }
  },
  computed: {
    loaded() {
      return (
        this.table != null &&
        this.gridData != null &&
        this.view != null &&
        this.fields != null &&
        this.config != null
      )
    },
    message() {
      if (this.tableId == null || this.viewId == null) {
        return 'Disabled'
      }
      if (!this.loaded) {
        return 'Loading...'
      }
      return ''
    },
  },
  watch: {
    tableId: {
      immediate: true,
      handler(value) {
        this.loadTable(value)
        this.loadTableFields(value)
      },
    },
    viewId: {
      immediate: true,
      handler(value) {
        this.loadView(value)
        this.loadGridData(value)
      },
    },
  },
  methods: {
    async loadTable(tableId) {
      this.table = null
      if (tableId != null) {
        try {
          const response = await this.$client.get(
            `/database/tables/${tableId}/`
          )
          this.table = response.data
        } catch (error) {
          console.error('Error loading table:', error)
        }
      }
    },
    async loadTableFields(tableId) {
      this.fields = null
      if (tableId != null) {
        try {
          const response = await this.$client.get(
            `/database/fields/table/${this.tableId}/`
          )
          this.fields = response.data
        } catch (error) {
          console.error('Error loading table fields:', error)
        }
      }
    },
    async loadView(viewId) {
      this.view = null
      if (viewId != null) {
        try {
          const response = await this.$client.get(`/database/views/${viewId}/`)
          this.view = response.data
        } catch (error) {
          console.error('Error loading view:', error)
        }
      }
    },
    async loadGridData(viewId) {
      this.gridData = null
      if (viewId != null) {
        try {
          const response = await this.$client.get(
            `/database/views/grid/${viewId}/`
          )
          this.gridData = response.data
        } catch (error) {
          console.error('Error loading grid view:', error)
        }
      }
    },
  },
}
</script>
