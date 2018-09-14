const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
    }),/// 每次构建清理dist文件夹
    new HtmlWebpackPlugin({
      title: 'PresByter'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: path.appSrc,
      //   loader: require.resolve('babel-loader'),
      //   options: {
      //     // This is a feature of `babel-loader` for webpack (not Babel itself).
      //     // It enables caching results in ./node_modules/.cache/babel-loader/
      //     // directory for faster rebuilds.
      //     cacheDirectory: true,
      //     plugins: ['react-hot-loader/babel'],
      //   },
      // },
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
