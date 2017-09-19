const path = require('path')

const config = {
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules')  //Adding the default value 
    ]
  },
  entry: ['babel-polyfill', './lib/renderers/dom.js'],
  output: {
    path: path.resolve(__dirname, 'public'),  //, not +
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  }
}

module.exports = config