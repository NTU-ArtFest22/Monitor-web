import Express from 'express';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import Webpack_isomorphic_tools from 'webpack-isomorphic-tools';
import path from 'path';

const option = {
    contentBase: 'http://localhost:8081',
    noInfo: true,
    stats: { colors: true },
    quiet: true,
    hot: true,
    inline: true,
    lazy: false,
    headers: {'Access-Control-Allow-Origin': '*'},
    publicPath: config.output.publicPath
};

const compiler = webpack(config);

const server = new webpackDevServer(compiler, option);

server.listen(8081, 'localhost');

const project_base_path = __dirname;
import configuration from './webpack-isomorphic-tools-configuration';

global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(configuration)
    .development(process.env.NODE_ENV === 'development')
    .server(project_base_path, function()
    {
        require('./server');
    });
