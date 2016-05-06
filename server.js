import Express from 'express';
import { Server, createServer } from 'http';
import { server as WebSocketServer} from 'websocket';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const DEV_PORT = process.env.PORT || 8081;
const STAGE_PORT = process.env.STAGE_PORT || 9000;

const app = new Express();
const server = Server(app);
const wsServer = createServer(response => {
    response.writeHead(404);
    response.end();
});
wsServer.listen(STAGE_PORT);

const stageServer = new WebSocketServer({
    httpServer: wsServer,
    autoAcceptConnection: true
});

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import React from 'react';
import { renderToString } from 'react-dom/server';

import ChatroomApp from './src/Reducers';
import App from './src/Components/App.js';

import ios from 'socket.io';

import { OrderedMap } from 'immutable';

import chatroomSocket from './socket/chatroom';
import stageSocket from './socket/stage';
let io = ios(server);
io = chatroomSocket(io);

const stageIo = stageSocket(stageServer);

app.use(Express.static('public'));

const middlewares = [promiseMiddleware];

function handleRender(req, res) {
    if (process.env.NODE_ENV === "development") {
        const logger = createLogger({
            predicate: (gatState, action) => action.type !== 'SET_WILL_SCROLL'
        });
        middlewares.push(logger);

        global.webpack_isomorphic_tools.refresh();
    }

    let onlineCounter = Object.keys(io.onlineCounter)
        .reduce( (counters, id) => {
            let monitor = io.onlineCounter[id];
            counters[monitor] = counters[monitor] ? counters[monitor] + 1 : 1;
            return counters;
        }, {});

    let initialState = {
        onlineCounter,
        monitor: 1,
        player: null,
        players: [
            {
                src: "2O0QlJz8EFc"
            },
            {
                src: "JTIWNoUDHP4"
            },
            {
                src: "RHmH_uq9Ops"
            },
            {
                src: "EyepEXOlRmY"
            },
            {
                src: "GLE9_LwzDjs"
            },
            {
                src: "eH7hBiY9xkg"
            },
            {
                src: "mx6t6E24SSM",
                player: null
            },
            {
                src: "2WMnw14bHbM",
                player: null
            },
            {
                src: "8B3jQP9gNyg",
                player: null
            },
            {
                src: "KF47Za1lfjM",
                player: null
            }
        ],
        showChat: true,
        records: OrderedMap(),
        willScroll: true
    };

    const store = createStore(ChatroomApp, initialState,
        compose(
            applyMiddleware(...middlewares)
        )
    );

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const styles = global.webpack_isomorphic_tools.assets().assets['./src/css/style.css'];

    const finalState = store.getState();

    res.send(renderFullPage(html, styles, finalState));
}

function renderFullPage(html, styles, initialState) {
    return `<!DOCTYPE HTML>
        <html>
        <head>
            <title>Socket.IO chat</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
            <style type="text/css">${styles}</style>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="${process.env.NODE_ENV === 'development' ? `http://${HOST}:${DEV_PORT}/public/bundle.js` : 'bundle.js'}"></script>
        </body>
        </html>`;
}

app.use(handleRender);

server.listen(PORT);
