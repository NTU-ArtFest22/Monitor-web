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

import { counterChanged } from './Actions/Socket';
import { switchMonitor } from './Actions/Monitors';

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

const stageSocket = io('http://localhost:9000');

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

stageSocket.on('control', move => {
    const cur = store.getState().monitor;
    const len = store.getState().players.length;

    if (move === "up") {
        store.dispatch(switchMonitor(cur > 0 ? cur - 1 : len - 1));
    }
    else if (move === "down") {
        store.dispatch(switchMonitor(cur < len - 1 ? cur + 1 : 0));
    }
});

stageSocket.on('connect', () => {
    
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
