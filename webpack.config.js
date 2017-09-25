const path = require('path')
const webpack = require('webpack')

const config = {
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules')  //Adding the default value 
    ]
  },
  // entry: ['babel-polyfill', './lib/renderers/dom.js'],
  entry: {
    vendor: [ //All the libraries we are importing from on our app code. Notice wehave left out babel-loader, babel-cli etc.
      'babel-polyfill',
      'react',
      'react-dom',
      'prop-types',
      'axios',
      'lodash.debounce'
    ],
    app: ['./lib/renderers/dom.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }) //We optimise the chunk that is most re-used. We could optimise app instead but that's really not effective
  ],
  output: {
    path: path.resolve(__dirname, 'public'),  //, not +
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2']
          }
        }
      }
    ]
  }
}

module.exports = config