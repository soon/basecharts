import { PluginNamePlugin } from '@basecharts/plugins'
import chartEditorStore from '@basecharts/store/chartEditor'

export default (context) => {
  const { store, app } = context

  store.registerModule('basecharts/chartEditor', chartEditorStore)
  app.$registry.register('plugin', new PluginNamePlugin(context))
}
