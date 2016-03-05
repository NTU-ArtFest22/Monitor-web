"use strict";
const express = require('express');
const app = express();

if (process.env.NODE_ENV === "development") {
    const webpack = require('webpack');
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        stats: { colors: true },
        quiet: false,
        hot: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));

const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./socket/chatroom.js')(io);

const PORT = process.env.PORT || 8080;

server.listen(PORT);
