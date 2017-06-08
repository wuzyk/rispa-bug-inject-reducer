import { createConfig } from '@webpack-blocks/webpack2'
import universalSettings from '../universal-webpack-settings'
import webpackExtentionClient from './client.wpc'
import clientConfiguration from '../src/configuration/client'
import renderMiddleware from '../src/middleware'

const activator = on => {
  on('init', (command, registry) => {
    if (command === 'server' || command === 'build') {
      registry.add('webpack.client', webpackExtentionClient)
    }

    if (command === 'server') {
      registry.set('render', renderMiddleware)
    }
  })

  on('prepare', (command, registry) => {
    if (command === 'server' || command === 'build') {
      const webpackConfig = createConfig(registry.get('webpack.client') || [])
      registry.set('webpack.client', [() => clientConfiguration(
        webpackConfig,
        universalSettings,
      )])
    }
  })
}

export default activator
