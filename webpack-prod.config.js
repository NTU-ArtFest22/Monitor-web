var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
import configuration from './webpack-isomorphic-tools-configuration';

var webpack_isomorphic_tools_plugin =
    // webpack-isomorphic-tools settings reside in a separate .js file
    // (because they will be used in the web server code too).
    new Webpack_isomorphic_tools_plugin(configuration)
    // also enter development mode since it's a development webpack configuration
    // (see below for explanation)
    .development();

module.exports = {
    devtool: 'eval',
    context: __dirname,
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-2']
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader", "postcss-loader"]
        }]
    },
    postcss: function() {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        webpack_isomorphic_tools_plugin
    ]
};
