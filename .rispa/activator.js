import { init, prepare, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import { createConfig } from '@webpack-blocks/webpack2'
import universalSettings from '../universal-webpack-settings'
import webpackExtentionClient from './client.wpc'
import clientConfiguration from '../src/configuration/client'
import renderMiddleware from '../src/middleware'

const activator = on => {
  on(init(server), (command, registry) => {
    registry.add('webpack.client', webpackExtentionClient)
    registry.set('render', renderMiddleware)
  })

  on(init(build), (command, registry) => {
    registry.add('webpack.client', webpackExtentionClient)
  })

  const prepareHandler = (command, registry) => {
    const webpackConfig = createConfig(registry.get('webpack.client') || [])
    registry.set('webpack.client', [() => clientConfiguration(
      webpackConfig,
      universalSettings,
    )])
  }
  on(prepare(server), prepareHandler)
  on(prepare(build), prepareHandler)
}

export default activator
