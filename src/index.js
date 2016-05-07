import React from 'react';
import { render } from 'react-dom';
import App from './Containers/App';
import ChatList from './Containers/ChatList';
import style from './css/style.css';

import ChatroomApp from './Reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Firebase from 'firebase';
import { OrderedMap } from 'immutable';
import io from 'socket.io-client';
import { w3cwebsocket as W3cWebSocket } from 'websocket';

import { configureFirebase, addMsgToList, saveUid, setMsgToList, setWillScroll } from './Actions/ChatList';
import { counterChanged } from './Actions/Socket';
import { switchMonitor } from './Actions/Monitors';
import { controlUp, controlDown, controlLeft, controlRight, stopControl } from './Actions/Videos';

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
    // socket.emit('user_connected', initialState.monitor || 1);
});

const stageSocket = new W3cWebSocket('ws://localhost:9000', null);

initialState.socket = initialState.socket || socket;
initialState.records = OrderedMap();

const store = createStore(
    ChatroomApp,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

socket.on('counter_changed', (onlineCounter) => {
    // store.dispatch(counterChanged(onlineCounter));
});

stageSocket.onmessage = (e) => {
    const cur = store.getState().monitor;
    const len = store.getState().players.length;

    if (e.data === "client-up") {
        store.dispatch(controlUp());
        store.dispatch(switchMonitor(cur > 1 ? cur - 1 : len));
    }
    else if (e.data === "client-down") {
        store.dispatch(controlDown());
        store.dispatch(switchMonitor(cur < len ? cur + 1 : 1));
    }
    else if (e.data === "client-left") {
        store.dispatch(controlLeft(cur));
    }
    else if (e.data === "client-right") {
        store.dispatch(controlRight(cur));
    }
    else if (e.data === "client-stop") {
        store.dispatch(stopControl(cur));
    }
};

const fireRef = new Firebase('https://monitor-web.firebaseio.com/records');
const counterRef = new Firebase('https://monitor-web.firebaseio.com/counter');

store.dispatch(configureFirebase(fireRef));

fireRef.authAnonymously((error, authData) => {
    if (error) {
        console.log(error);
    }
    else {
        store.dispatch(saveUid(authData.uid));
    }
});


counterRef.child(store.getState().monitor).transaction(cur => (cur || 0) + 1);

counterRef.on('value', (snap) => {
    counterRef.onDisconnect().update({
        [store.getState().monitor]: (snap.val()[store.getState().monitor] || 1) - 1
    });
});

counterRef.on('value', counters => {
    store.dispatch(counterChanged(counters.val() || []));
});

// const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
