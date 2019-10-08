const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.nocache.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-flow'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/index': {
        target: 'http://xxsy.1i2.cn',
        secure: false,
        changeOrigin: true,
      },
      '/resourcePic': {
        target: 'http://xxsy.1i2.cn',
        secure: false,
        changeOrigin: true,
      },
    },
  },
}
