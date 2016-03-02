import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';

import ChatroomApp from './Reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
let logger = createLogger({
    predicate: (gatState, action) => action.type !== 'PLAYER_TIMEUPDATE'
});

import io from 'socket.io-client';

const socket = io(window.location.origin);

let store = createStore(ChatroomApp, {socket: socket, records: []},
    compose(
        applyMiddleware(promiseMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
