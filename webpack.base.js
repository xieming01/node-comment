const path = require('path');    //#nodejs内置模块
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {                                   //# webpack4.x必须定义
  entry: path.resolve(__dirname, './src/index.js'),     //# 入口文件
  output: {                                             //# 出口文件
    path: path.resolve(__dirname, './dist'),
    filename: '[hash:6].[name].js'
  },
  devServer: {                                          //# 配置webpack-dev-server
    contentBase: path.join(__dirname, 'dist'), 
    // historyApiFallback:{
    //   index:path.join(__dirname,'./dist/index.html')
    // },     
    compress: true,
    port: 3000,
    inline: true,
    hot: true,
    publicPath: '/',
    // open: true,
    host: '172.18.154.197'
  },

  resolve: {
    //引入模块的时候，可以不用扩展名 
    extensions: [".js", ".less", ".json"],
    // alias: {//别名
    //     "bootstrap": "bootstrap/dist/css/bootstrap.css"
    // },
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   // 提出ant design的公共资源
  //   'antd': 'antd',
  // },
    devtool: 'source-map',
    optimization: {
      // minimize: true,
      splitChunks: {
          cacheGroups: {
              commons: {
                  chunks: "initial",
                  minChunks: 2, //模块出现1次就会被抽离到公共模块
                  maxInitialRequests: 5, ////异步模块，一次最多只能被加载5个 The default limit is too small to showcase the effect
                  minSize: 0 // //模块大于30k会被抽离到公共模块 This is example is too small to create commons chunks
              },
              vendor: {
                  test: /node_modules/,
                  chunks: "initial",
                  name: "vendor",
                  priority: 10,
                  enforce: true
              }
          }
      }
  },
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
        // include: path.join(__dirname, './src'),
        // exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
      },  {
        test: /\.less$/,
        include: path.join(__dirname, './src'),
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        })
      },{
        test: /\.scss$/,
        include: path.join(__dirname, './src'),
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'scss-loader'],
        })
      },
    
    {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129&name=[hash:6][name].[ext]',
        exclude: /node_modules/
    }
    ]
  },
  plugins: [
     //定义环境变量
     new webpack.DefinePlugin({
      __development__: JSON.stringify(process.env.NODE_ENV)
  }),
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
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.NamedModulesPlugin(), // 执行热替换时打印模块名字
    new ExtractTextPlugin("[hash:6].[name].css"),
    new CopyWebpackPlugin([{
      from: path.join(__dirname,'vendor'),//静态资源目录源地址
      to:'./vendor' //目标地址，相对于output的path目录
    }]),
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, 'vendor', 'react.manifest.json')
    }),
  ]
};

//   resolve: {
//     extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
//     include: path.resolve(__dirname, 'src'),
//     },
    //   {
    //     test: /\.css$/,
    //     use: [
    //         {
    //             loader: "style-loader" //在html中插入<style>标签
    //         },
    //         {
    //             loader: "css-loader",//获取引用资源，如@import,url()
    //             options: {
    //                 modules: true,//启用css modules
    //                 localIdentName: '[name__[local]--[hash:base64:5]]'//指定css的类名格式，避免全局污染
    //             }
    //         },
    //         {
    //             loader: "postcss-loader",
    //             options: {
    //                 plugins:[
    //                     require('autoprefixer')({
    //                         browsers:['last 5 version']
    //                     })
    //                 ]
    //             }
    //         }
    //     ]
    // },
    // // {
    // //     test: /\.scss$|\.less$/,
    // //     loader: "css-loader!style-loader!less-loader!sass-loader?sourceMap!postcss-loader"
    // // },
    // {
    //     test:/\.less$/,
    //     use: [
    //         {
    //             loader: "style-loader"
    //         },
    //         {
    //             loader: "css-loader",
    //             options: {
    //                 importLoaders:2
    //             }
    //         },
    //         {
    //             loader: "postcss-loader",//自动加前缀
    //             options: {
    //                 plugins:[
    //                     require('autoprefixer')({
    //                         browsers:['last 5 version']
    //                     })
    //                 ]
    //             }

    //         },
    //         {
    //             loader: "less-loader"
    //         }
    //     ]
    // },
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