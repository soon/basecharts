import { createNamespacedHelpers } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

const { mapState, mapActions } = createNamespacedHelpers(
  'basecharts/chartEditor'
)

function applySchema(obj, schema) {
  const copy = { ...obj }
  for (const [key, value] of Object.entries(schema)) {
    if (!(key in copy)) {
      copy[key] = cloneDeep(value)
    }
  }
  return copy
}

export default {
  beforeCreate() {
    const editorConfig = this.$store.state['basecharts/chartEditor'].config
    const schema = this.$options.configSchema
    if (schema != null) {
      this.$store.dispatch(
        'basecharts/chartEditor/setConfig',
        applySchema(editorConfig, schema)
      )
    }
  },
  computed: {
    ...mapState(['config']),
  },
  methods: {
    ...mapActions(['updateConfig']),
    setConfigField(name, value) {
      this.updateConfig((config) => {
        config[name] = value
      })
    },
  },
}
