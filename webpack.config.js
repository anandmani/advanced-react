//Caching:
//https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
//When the server restarts, the last-modfied (,etag) all files change to server restart time, even if the files haven't changed. (Because there is no way to keep track of whether the files have changed between server sessions)
//Thus, cache-control with If-Modified since wont work
//Also, when we change the app files and don't touch vendor files and run webpack again, even though the vendor file hasn't changed (and it's name with chunkhash remains same), it's lastModified changes as it is regenerated.
//Thus, cache-control with If-Modified since wont work for vendor.js even is only app.js changes
//All the more reason to directly load cache from disk without making a network request and waiting for 304. This is beneficial even without keeping the above points in mind as it saves us a roundtrip to the server

const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin');

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
  plugins: process.env.NODE_ENV == 'production' ?
    [ //Adding chunk content specific hash to filename to invalidate hash. Webpack refers to modules by sequentially increasing id. If a new file is added, module id of every file is inc by 1. Since we are resolve app before node_modules, all modules will also have thier id inc by 1. To prevent this seq id, we use HashedModuleIdsPlugin
      new ManifestPlugin(),
      new webpack.HashedModuleIdsPlugin(), //https://webpack.js.org/guides/caching/
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }) //Contains webpack manifest and boilerplate which may change with every build. To prevent this from corrupting an untouched vendor.js
    ]
    :
    [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }) //We optimise the chunk that is most re-used. We could optimise app instead but that's really not effective
    ],
  output: {
    path: path.resolve(__dirname, 'public'),  //, not +
    filename: process.env.NODE_ENV == 'production' ? '[name].[chunkhash].js' : '[name].js'
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