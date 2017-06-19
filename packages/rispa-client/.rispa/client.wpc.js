import path from 'path'

export default () => ({
  entry: [
    require.resolve('react-hot-loader/patch'),
    path.resolve(__dirname, '../src/client.js'),
  ],
})
