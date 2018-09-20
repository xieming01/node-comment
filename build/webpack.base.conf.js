// webpack.base.conf.js 文件
const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist');
const APP_PATH = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: './src/index.js',
    framework: ['react', 'react-dom'],
  },
  output: {
    // filename: "js/bundle.js",
    filename: 'js/[name].[hash].js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'cache-loader'
          }
        ],
        include: APP_PATH,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" //在html中插入<style>标签
          },
          {
            loader: "css-loader",//获取引用资源，如@import,url()
            // 可以在 import Styles from "../*.css" 以这样的内联的方式使用
            options: {
              modules: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 version']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",//自动加前缀
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 version']
                })
              ]
            }
          },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
          { loader: "sass-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 version']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // outputPath:'../',//输出**文件夹
            publicPath: '/',
            name: "images/[name].[ext]",
            limit: 1000  //是把小于1000B的文件打成Base64的格式，写入JS
          }
        }]
      },
      {
        test: /\.(woff|svg|eot|woff2|tff)$/,
        use: 'url-loader',
        //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/
        // exclude忽略/node_modules/的文件夹
      }
    ]
  }
};
