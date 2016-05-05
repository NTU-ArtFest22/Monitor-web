import React from 'react';
import { render } from 'react-dom';
import App from './Containers/App';
import style from './css/style.css';

import ChatroomApp from './Reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import io from 'socket.io-client';
import { w3cwebsocket as W3cWebSocket } from 'websocket';

import { counterChanged } from './Actions/Socket';
import { switchMonitor } from './Actions/Monitors';
import { controlLeft, controlRight, stopControl } from './Actions/Videos';

const middlewares = [promiseMiddleware];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        predicate: (gatState, action) => action.type !== 'SET_WILL_SCROLL'
    });
    middlewares.push(logger);
}

const initialState = window.__INITIAL_STATE__;

const socket = io();
socket.on('connect', () => {
    socket.emit('user_connected', initialState.monitor || 1);
});

const stageSocket = new W3cWebSocket('ws://localhost:9000', null);

initialState.socket = initialState.socket || socket;

let store = createStore(ChatroomApp, initialState,
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

socket.on('counter_changed', (onlineCounter) => {
    store.dispatch(counterChanged(onlineCounter));
});

stageSocket.onmessage = (e) => {
    const cur = store.getState().monitor;
    const len = store.getState().players.length;

    if (e.data === "client-up") {
        store.dispatch(switchMonitor(cur > 0 ? cur - 1 : len - 1));
    }
    else if (e.data === "client-down") {
        store.dispatch(switchMonitor(cur < len - 1 ? cur + 1 : 0));
    }
    else if (e.data === "client-left") {
        store.dispatch(controlLeft(store.getState().monitor));
    }
    else if (e.data === "client-right") {
        store.dispatch(controlRight(store.getState().monitor));
    }
    else if (e.data === "client-stop") {
        store.dispatch(stopControl(store.getState().monitor));
    }
};

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
