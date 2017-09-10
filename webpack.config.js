const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: {
    app: ['./js/index.js'],
    vendor: ['jquery', 'axios']
  },

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }
      ]
    },
    {
      test: /\.hbs$/,
      use: [
        {
            loader: 'handlebars-loader'
        }
      ]
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }
      ]
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
      use: [
        {
          loader: 'url-loader?limit=10000'
        }
      ]
    }
  ]
  },
  devServer: {
    disableHostCheck: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new HtmlWebpackPlugin({
      template: './index.hbs',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
