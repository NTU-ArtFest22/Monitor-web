import Koa from 'koa';
import serve from 'koa-static';
import send from 'koa-send';
import { createServer } from 'http';
import { server as WebSocketServer } from 'websocket';

const PORT = process.env.PORT || 8080;
const STAGE_PORT = process.env.STAGE_PORT || 9000;

// ==============================================
// setup stage socket
// ==============================================
const wsServer = createServer(response => {
  response.writeHead(404);
  response.end();
});

const stageServer = new WebSocketServer({
  httpServer: wsServer,
  autoAcceptConnection: true
});

const connections = [];

stageServer.on('request', (request) => {
  console.log('connected to stage');

  const connection = request.accept(null, request.origin);
  connections.push(connection);
  connection.sendUTF('connected');

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connections.forEach(conn => {
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
const app = new Koa();

app.listen(PORT);

app.use(serve(__dirname));

app.use(function * () {
  yield send(this, __dirname + '/index.html');
});

console.log('server listening on port ' + PORT);
