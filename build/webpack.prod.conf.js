// webpack.prod.conf.js 文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // inject: 'body',
      title: 'PresByter',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    // 源检查
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // 缓存模块
    new webpack.HashedModuleIdsPlugin(),
    // 清除dist下的文件
    new CleanWebpackPlugin(['../dist'], { allowExternal: true })
  ],
  output: {
    filename: "js/[name].[chunkhash:16].js",
  },
  optimization: {
    // js 模块分割
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        }
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  mode: 'production'
});
