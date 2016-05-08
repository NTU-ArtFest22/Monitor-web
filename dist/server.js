'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

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

app.listen(PORT);

app.use((0, _koaStatic2.default)(__dirname));

app.use(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _koaSend2.default)(this, __dirname + '/index.html');

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

console.log('server listening on port ' + PORT);
