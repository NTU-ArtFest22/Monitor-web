import Koa from 'koa';
import convert from 'koa-convert'
import serve from 'koa-static';
import historyApiFallback from 'koa-connect-history-api-fallback';
import { createServer } from 'http';
import { server as WebSocketServer } from 'websocket';

const PORT = process.env.PORT || 80;
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

app.use(convert(historyApiFallback({
  verbose: false
})));

app.use(convert(serve(__dirname)));

app.listen(PORT);

console.log('server listening on port ' + PORT);
