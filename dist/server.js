'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

var _koaConnectHistoryApiFallback = require('koa-connect-history-api-fallback');

var _koaConnectHistoryApiFallback2 = _interopRequireDefault(_koaConnectHistoryApiFallback);

var _http = require('http');

var _websocket = require('websocket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8080;
var STAGE_PORT = process.env.STAGE_PORT || 9000;

// ==============================================
// setup stage socket
// ==============================================
var wsServer = (0, _http.createServer)(function (response) {
  response.writeHead(404);
  response.end();
});

var stageServer = new _websocket.server({
  httpServer: wsServer,
  autoAcceptConnection: true
});

var connections = [];

stageServer.on('request', function (request) {
  console.log('connected to stage');

  var connection = request.accept(null, request.origin);
  connections.push(connection);
  connection.sendUTF('connected');

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connections.forEach(function (conn) {
        conn.sendUTF('client-' + message.utf8Data);
      });
    }
  });
});

wsServer.listen(STAGE_PORT);

console.log('websocket server listening on port ' + STAGE_PORT);

// ==============================================
// setup server
// ==============================================
var app = new _koa2.default();

app.use((0, _koaConvert2.default)((0, _koaConnectHistoryApiFallback2.default)({
  verbose: false
})));

app.use((0, _koaConvert2.default)((0, _koaStatic2.default)(__dirname)));

// app.use(function * () {
//   yield send(this, __dirname + '/index.html');
// });

app.listen(PORT);

console.log('server listening on port ' + PORT);
