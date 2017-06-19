import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { clientConfiguration } from 'universal-webpack'

const IS_PROD = process.env.NODE_ENV === 'production'

const addExtractPlugin = config => {
  const extractPlugin = new ExtractTextPlugin({
    filename: '[name]-[contenthash].css',
    allChunks: true,
  })

  const newRules = config.module.rules.map(rule => {
    let isStyleLoaderRule
    let styleLoaderIndex

    const loaders = []
      .concat([rule.loader])
      .concat(rule.loaders || [])
      .concat(rule.use)
      .filter(Boolean)

    loaders.forEach((loader, index) => {
      const loaderName = typeof loader === 'string' ? loader : loader.loader
      if (/(style-loader|style)$/.test(loaderName)) {
        isStyleLoaderRule = true
        styleLoaderIndex = index
      }
    })

    if (!isStyleLoaderRule) {
      return rule
    }

    const beforeStyleLoader = loaders.slice(0, styleLoaderIndex)
    const afterStyleLoader = loaders.slice(styleLoaderIndex + 1)
    const styleLoader = loaders[styleLoaderIndex]

    const extractLoaders = ExtractTextPlugin.extract({
      remove: IS_PROD,
      use: afterStyleLoader,
    })

    const newRule = { ...rule }
    delete newRule.loaders
    newRule.use = [
      ...beforeStyleLoader,
      ...(IS_PROD ? [] : [styleLoader]),
      ...extractLoaders,
    ]

    return newRule
  })

  return {
    ...config,
    plugins: [
      ...config.plugins,
      extractPlugin,
    ],
    module: {
      ...config.module,
      rules: newRules,
    },
  }
}

export default (config, settings, options) =>
  clientConfiguration(addExtractPlugin(config), settings, options)
