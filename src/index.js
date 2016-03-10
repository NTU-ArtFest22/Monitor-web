import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import style from './css/style.css';

import ChatroomApp from './Reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import io from 'socket.io-client';

import { counterChanged } from './Actions/Socket';

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

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
