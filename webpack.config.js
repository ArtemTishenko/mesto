const path = require('path');
const  {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { default: postcss } = require('postcss');
module.exports = {
  entry:{
    main: './src/pages/index.js'
  } ,
   output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development',
  devServer:{
    contentBase: path.resolve(__dirname,'./dist'),
    compress: true,
    port: 8080,
    open: true
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()

  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource'
    },
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
    },
  ]
    },
    devtool: 'inline-source-map',


}
