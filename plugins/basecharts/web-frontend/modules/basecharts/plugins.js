import { BaserowPlugin } from '@baserow/modules/core/plugins'
import SidebarMenuComponent from './components/SidebarMenuComponent.vue'

export class PluginNamePlugin extends BaserowPlugin {
  static getType() {
    return 'basecharts'
  }

  getSidebarMainMenuComponent() {
    return SidebarMenuComponent
  }
}
