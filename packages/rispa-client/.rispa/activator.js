import { init, start, build, generator } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import webpackClientConfig from './client.wpc'
import runGenerator from './generators'

const activator = on => {
  const handler = registry => {
    registry.add('webpack.client', webpackClientConfig)
  }
  on(init(server), handler)
  on(init(build), handler)

  on(start(generator), (registry, data) => {
    runGenerator(data)
  })
}

export default activator

