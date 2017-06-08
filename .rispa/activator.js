import build from '../src/build'
import webpackExtensionCommon from './common.wpc'
import webpackExtensionClient from './client.wpc'

const activator = on => {
  on('init', (command, registry) => {
    if (command === 'build' || command === 'server') {
      registry.add('webpack.common', webpackExtensionCommon)
      registry.add('webpack.client', webpackExtensionCommon, webpackExtensionClient)
    }
  })

  on('start', (command, registry) => {
    if (command === 'build') {
      build(registry.get('webpack.client'))
    }
  })
}

export default activator
