const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './demos',
    port: 8094,
    host: '127.0.0.1'
  },
  entry: {
    'rangy-loader': './src/rangy-loader.js',
    'rangy-classapplier': './src/modules/rangy-classapplier.js',
    'rangy-highlighter': './src/modules/rangy-highlighter.js',
    'rangy-selectionsaverestore': './src/modules/rangy-selectionsaverestore.js',
    'rangy-serializer': './src/modules/rangy-serializer.js',
    'rangy-textrange': './src/modules/rangy-textrange.js',
    'rangy-util': './src/modules/rangy-util.js'
  },
  output: {
    path: path.resolve('./dist/'),
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js',
    globalObject: 'window'
  },
  module: {
    rules: []
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: { mangle: false, compress: {} }
      })
    ]
  }
}
