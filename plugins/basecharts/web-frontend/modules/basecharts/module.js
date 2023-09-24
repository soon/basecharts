import path from 'path'

import { routes } from './routes'

export default function () {
  this.options.alias['@basecharts'] = path.resolve(__dirname, './')
  this.options.buildModules.push('@nuxtjs/composition-api/module')
  this.options.build.transpile.push(/echarts/, /zrender/)
  this.extendRoutes((configRoutes) => {
    configRoutes.push(...routes)
  })
  this.appendPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
  })
  this.options.css.push(path.resolve(__dirname, 'assets/scss/default.scss'))
}
