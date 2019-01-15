const path = require('path');    //#nodejs内置模块
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',                                   //# webpack4.x必须定义
  entry: path.resolve(__dirname, './src/index.js'),     //# 入口文件
  output: {                                             //# 出口文件
    path: path.resolve(__dirname, './dist'),
    filename: '[hash:6].[name].js'
  },
  devServer: {                                          //# 配置webpack-dev-server
    contentBase: path.join(__dirname, 'dist'),           
    compress: true,
    port: 3000,
    inline: true,
    hot: true
  },
//   resolve: {
//     extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
//     include: path.resolve(__dirname, 'src'),
//     },
    resolve: {
        extensions: ['.jsx', '.web.js', '.js', '.json'],
    },
  devtool: 'cheap-module-source-map',
  module: {                                            
    rules: [                                           //# webpack4.x不再使用loaders 
      {                                                //# 改为rules + use
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',                       //# 解析ES6语法
          options: {
            presets: ['es2017', 'react','stage-0'],
            plugins: ['transform-runtime', ['import', {
                libraryName: 'antd',
                libraryDirectory: "es",
                style: 'css'
            }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader" //在html中插入<style>标签
            },
            {
                loader: "css-loader",//获取引用资源，如@import,url()
                options: {
                    modules: true,//启用css modules
                    localIdentName: '[name__[local]--[hash:base64:5]]'//指定css的类名格式，避免全局污染
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    plugins:[
                        require('autoprefixer')({
                            browsers:['last 5 version']
                        })
                    ]
                }
            }
        ]
    },
    // {
    //     test: /\.scss$|\.less$/,
    //     loader: "css-loader!style-loader!less-loader!sass-loader?sourceMap!postcss-loader"
    // },
    {
        test:/\.less$/,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    importLoaders:2
                }
            },
            {
                loader: "postcss-loader",//自动加前缀
                options: {
                    plugins:[
                        require('autoprefixer')({
                            browsers:['last 5 version']
                        })
                    ]
                }

            },
            {
                loader: "less-loader"
            }
        ]
    },
    // {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: "style-loader",
    //       use: "css-loader",
    //       filename:'[hash:6].[name].css'
    //     })
    //   },  {
    //     test: /\.szcss$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: 'style-loader',
    //       //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
    //       use: ['css-loader', 'less-loader'],
    //       filename:'[hash:6].[name].css'
    //     })
    //   },
    // {
    //   test:/\.scss$/,
    //   use:[
    //       {
    //           loader: "style-loader"
    //       },
    //       {
    //           loader: "css-loader",
    //           options: {
    //               importLoader:1,
    //           }
    //       },
    //       {
    //           loader: "sass-loader"
    //       },
    //       {
    //           loader: " ",
    //           options: {
    //               plugins:[
    //                   require('autoprefixer')({
    //                       browsers:['last 5 version']
    //                   })
    //               ]
    //           }
    //       }
    //   ]
    // },
    {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129',
        // filename: '[hash:6].[name].[query]',
        exclude: /node_modules/
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist',
            'build'], {
            root:__dirname,
            verbose: true,
            dry: false,
            exclude: ['jslibs']
        }),           //# 执行npm satrt是自动删除dist和build目录
    new htmlWebpackPlugin({                               //# 生成html文件
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    // new ExtractTextPlugin("styles.css"),
  ]
};