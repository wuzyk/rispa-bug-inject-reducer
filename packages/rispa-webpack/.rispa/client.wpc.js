import { createConfig, env } from '@webpack-blocks/webpack2'

export default () => createConfig([
  context => ({
    plugins: [
      new context.webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: '[name].js',
        minChunks: Infinity,
      }),
    ],
  }),
  env('development', [
    context => ({
      entry: [require.resolve('webpack-hot-middleware/client')],
      plugins: [
        new context.webpack.HotModuleReplacementPlugin(),
      ],
    }),
  ]),
  env('production', [
    context => ({
      plugins: [
        new context.webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    }),
  ]),
])
