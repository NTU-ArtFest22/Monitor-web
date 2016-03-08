import express from 'express';
import { Server } from 'http';

const app = express();
const server = Server(app);

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import React from 'react';
import { renderToString } from 'react-dom/server';

import ChatroomApp from './src/Reducers';
import App from './src/Components/App.js';

import ios from 'socket.io';

import chatroomSocket from './socket/chatroom';
let io = ios(server);
io = chatroomSocket(io);

app.use(express.static('public'));

const middlewares = [promiseMiddleware];

if (process.env.NODE_ENV === "development") {
    // const webpack = require('webpack');
    // const config = require('./webpack.config.js');
    // const compiler = webpack(config);
    //
    // app.use(require('webpack-dev-middleware')(compiler, {
    //     noInfo: true,
    //     stats: { colors: true },
    //     quiet: false,
    //     hot: true,
    //     publicPath: config.output.publicPath
    // }));
    // app.use(require('webpack-hot-middleware')(compiler));

    const logger = createLogger({
        predicate: (gatState, action) => action.type !== 'SET_WILL_SCROLL'
    });
    middlewares.push(logger);
}

function handleRender(req, res) {
    let initialState = {
        onlineCounter: 0,
        monitor: 1,
        records: [],
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

    const finalState = store.getState();

    res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, initialState) {
    return `
        <!DOCTYPE HTML>
        <html>
        <head>
            <title>Socket.IO chat</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="bundle.js"></script>
        </body>
        </html>
    `;
}

app.use(handleRender);

const PORT = process.env.PORT || 8080;

server.listen(PORT);
