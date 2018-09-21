const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: "js/[name].[hash:16].js",
  },
  // 源错误检查
  devtool: 'inline-source-map',
  plugins: [
    // 处理html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // ["import", { libraryName: "antd", style: true }]

  ],
  devServer: {
    port: '3000',
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    open: true,
    proxy: {}
  }
});
