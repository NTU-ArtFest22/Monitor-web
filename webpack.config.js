var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
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
            loader: "style-loader!css-loader!postcss-loader"
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
