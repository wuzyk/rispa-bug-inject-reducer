import WriteFilePlugin from 'write-file-webpack-plugin'
import StatsPlugin from 'stats-webpack-plugin'
import { createConfig, env } from '@webpack-blocks/webpack2'

export default () => createConfig([
  () => ({
    plugins: [
      new StatsPlugin('stats.json', {
        chunkModules: true,
        modules: true,
        chunks: true,
        assets: true,
        chunkOrigins: true,
        source: false,
        exclude: [/node_modules/],
      }),
    ],
  }),
  env('development', [
    () => ({
      plugins: [
        new WriteFilePlugin({
          test: /stats.json/,
        }),
      ],
    }),
  ]),
])
