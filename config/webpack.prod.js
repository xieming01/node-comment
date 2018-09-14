const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    // 源检查
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // 缓存模块
    new webpack.HashedModuleIdsPlugin(),
    // 定义生产模式
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
});
