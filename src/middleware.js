import path from 'path'
import webpack from 'webpack'
import { createConfig } from '@webpack-blocks/webpack2'
import createDebug from 'debug'
import { server, prepare } from 'universal-webpack'
import cookiesMiddleware from 'universal-cookie-express'
import serverConfiguration from './configuration/server'
import settings from '../universal-webpack-settings'

const log = createDebug('rispa:info:render-server')
const logError = createDebug('rispa:error:render-server')
const compilerWatchConfig = {
  aggregateTimeout: 300,
}

const logBuildResult = (err, stats) => {
  if (err) {
    logError('Failed to compile.')
    logError(err)
  } else if (stats.compilation.errors.length) {
    logError('Failed to compile.')
    stats.compilation.errors.forEach(error => {
      logError(error.message || error)
    })
  } else {
    log('Render server compiled successfully.')
  }
}

const renderMiddleware = (app, registry) => {
  const webpackConfig = createConfig(registry.get('webpack.common') || [])
  const cacheConfig = {
    components: registry.get('ssr-cache'),
  }

  const config = {
    ...webpackConfig,
    context: path.resolve(__dirname, '..'),
  }

  prepare(settings, config)
  const compiler = webpack(serverConfiguration(config, settings))
  const serverConfig = {
    ...config,
    cacheConfig,
  }

  let render
  let asyncRender = server(serverConfig, settings)

  if (process.env.NODE_ENV === 'production') {
    compiler.run(logBuildResult)
  } else {
    compiler.watch(compilerWatchConfig, (err, stats) => {
      logBuildResult(err, stats)

      if (!err && !stats.compilation.errors.length) {
        const buildPath = path.resolve(__dirname, '..', settings.server.output)
        delete require.cache[buildPath]
        render = null
        asyncRender = server(serverConfig, settings)
      }
    })
  }

  app.use(cookiesMiddleware())

  app.get('*', (req, res) => {
    if (render) {
      render(req, res)
    } else {
      asyncRender.then(rndr => {
        render = rndr
        render(req, res)
      })
    }
  })
}

export default renderMiddleware
