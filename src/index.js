import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import style from './css/style.css';

import ChatroomApp from './Reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

const middlewares = [promiseMiddleware];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        predicate: (gatState, action) => action.type !== 'SET_WILL_SCROLL'
    });
    middlewares.push(logger);
}

import io from 'socket.io-client';

const socket = io(window.location.origin);

let store = createStore(ChatroomApp, {monitor: 1, socket: socket, records: [], willScroll: true},
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
