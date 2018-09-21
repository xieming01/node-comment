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
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            // 开启缓存功能
            options: {
              // presets: ['@babel/preset-env'],
              // plugins: [require('@babel/plugin-proposal-object-rest-spread')],
              cacheDirectory: true
            }
          },
          {
            loader: 'cache-loader'
          }
        ],
        include: APP_PATH,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 version']
                })
              ]
            }
          },
          // javascriptEnabled: true  ------  在less里面可以使用JavaScript表达式
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
        // 切记这个地方一定要引入antd，文档上没有写入但是一定要因引进去，切记切记
        include: [/antd/],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,//可以写成styles.name的样式
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
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
          },
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
        exclude: [/antd/],
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
