// webpack.prod.conf.js 文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    // 分析哪些文件体积过大
    new BundleAnalyzerPlugin(),

  ],
  output: {
    filename: "js/[name].[chunkhash:16].js",
  },
  optimization: {
    // js 模块分割
    splitChunks: {
      name: 'vendor', //拆分块的名称
      chunks: 'all', //将选择哪些块进行优化 同步异步
      minSize: 30, //要生成的块的最小大小。
      minChunks: 1, //分割前必须共享模块的最小块数。
      maxAsyncRequests: 20, //按需加载时的最大并行请求数。
      maxInitialRequests: 20, //入口点处的最大并行请求数。
      automaticNameDelimiter: '~',//自动命名连接符（例如vendors~main.js）
      cacheGroups: { //缓存组可以继承和/或覆盖任何选项splitChunks.*;
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,//
          priority: -10
        },
        default: {
          test: /[\\/]src[\\/]js[\\/]/,
          minChunks: 2,//一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true
        },
        framework: {
          test: "framework",
          name: "framework",
          enforce: true,
          minSize: 30000, //要生成的块的最小大小。
          minChunks: 1, //分割前必须共享模块的最小块数。
        }
      },
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  mode: 'production'
});
