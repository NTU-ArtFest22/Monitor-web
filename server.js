var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var app = express();

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: { colors: true },
  quiet: false,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected!');

    socket.on('chat', function(data) {
        console.log('<< ' + data);
        io.emit('chat', data);
    });

    socket.on('disconnect', function() {
        console.log('disconnect!');
    });
});

var PORT = process.env.PORT || 8080;

server.listen(PORT);
