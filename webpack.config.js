const path = require('path')

const config = {
  entry: './lib/components/Index.js',
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