var express = require('express');
var app = express();

if (process.env.NODE_ENV === "development") {
    var webpack = require('webpack');
    var config = require('./webpack.config.js');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        stats: { colors: true },
        quiet: false,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected!');

    socket.on('chat', function(data) {
        var log = {
            user: socket.id,
            user_ip: socket.handshake.address,
            monitor: data.monitor,
            msg: data.msg
        };
        console.log(log);
        io.emit('chat', log);
    });

    socket.on('disconnect', function() {
        console.log('disconnect!');
    });
});

var PORT = process.env.PORT || 8080;

server.listen(PORT);
