import webpackClientConfig from './client.wpc'
import generator from './generators'

const activator = on => {
  on('init', (command, registry) => {
    if (command === 'server' || command === 'build') {
      registry.add('webpack.client', webpackClientConfig)
    }
  })

  on('start', (command, registry, data) => {
    if (command === 'generator') {
      generator(data)
    }
  })
}

export default activator

