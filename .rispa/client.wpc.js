import path from 'path'

export default context => ({
  entry: [
    require.resolve('react-hot-loader/patch'),
    path.resolve(__dirname, '../src/client.js'),
  ],
  plugins: [
    new context.webpack.DefinePlugin({
      'process.env.DISABLE_REDUX_DEVTOOLS': (
        JSON.stringify(process.env.DISABLE_REDUX_DEVTOOLS)
      ),
    }),
  ],
})
