import createRenderServer from './render/server'
import createRenderClient from './render/client'

export default parameters => {
  const createRender = process.env.DISABLE_SSR
    ? createRenderClient
    : createRenderServer

  const chunks = parameters.chunks()
  const cacheConfig = parameters.configuration.cacheConfig

  return createRender(chunks, cacheConfig)
}
