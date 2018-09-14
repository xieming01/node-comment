const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js',
    // polyfills: './src/polyfills.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
    }),/// 每次构建清理dist文件夹
    new HtmlWebpackPlugin({
      title: 'PresByter'
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助 ServiceWorkers 快速启用
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    }),
    // 声明全局变量
    // 设定一个公共路由
    new webpack.ProvidePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
      // _: 'lodash'
      // join: ['lodash', 'join']
    })
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    // 输出文件不再携带路径信息 
    pathinfo: false
  },
  optimization: {
    runtimeChunk: 'single',
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: [
          'babel-loader',
          'cache-loader'
        ],

      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
};
