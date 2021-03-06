import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
require('./css/style.css');
import initialState from './store/initialState';
import Firebase from 'firebase';
import { w3cwebsocket as W3cWebSocket } from 'websocket';
import Cookies from 'cookies-js';

import { configureFirebase, saveUid, connectedToChat } from './Actions/ChatList';
import { setPresence, counterChanged, counterAdded, counterRemoved } from './Actions/Socket';
import { userRef, saveName } from './Actions/Monitors';
import { controlUp, controlDown, controlLeft, controlRight, controlInteract,
  controlStop, controlSetPause, controlSetPlay, stopControl, pause } from './Actions/Videos';

import randomlyChooseName from './store/names';

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
// const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

// ========================================================
// Visibility event
// ========================================================
let hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, () => {
  if (document[hidden]) {
    store.dispatch(controlStop());
    store.dispatch(pause());
    store.dispatch(controlSetPause());
  } else {
    store.dispatch(controlStop());
    store.dispatch(pause());
    store.dispatch(controlSetPlay());
  }
}, false);

// ========================================================
// Firebase Setup
// ========================================================
const fireRef = new Firebase('https://monitor-web.firebaseio.com/records');
const presenceRef = new Firebase('https://monitor-web.firebaseio.com/presence');
const connectedRef = new Firebase('https://monitor-web.firebaseio.com/.info/connected');
const namesRef = new Firebase('https://monitor-web.firebaseio.com/names');

store.dispatch(configureFirebase(fireRef));

connectedRef.on('value', snap => {
  if (snap.val()) {
    fireRef.authAnonymously((error, authData) => {
      if (error) {
        console.log(error);
      }
      else {
        store.dispatch(saveUid(authData.uid));

        namesRef.once('value', snap => {
          let name = Cookies.get('userName') || randomlyChooseName();

          if (snap.val()) {
            while (snap.val()[name]) {
              name = randomlyChooseName();
            }
          }

          console.log(name);

          namesRef.push(name).onDisconnect().remove();
          store.dispatch(saveName(name));
          store.dispatch(connectedToChat());
        });
      }
    });

    userRef.onDisconnect().remove();

    userRef.set(store.getState().app.monitor);
  }
});

presenceRef.once('value', snap => {
  store.dispatch(setPresence(snap.val()));
});

presenceRef.on('child_added', snap => {
  store.dispatch(counterAdded(snap.key(), snap.val()));
});

presenceRef.on('child_changed', snap => {
  store.dispatch(counterChanged(snap.key(), snap.val()));
});

presenceRef.on('child_removed', snap => {
  store.dispatch(counterRemoved(snap.key(), snap.val()));
});

// ========================================================
// Websocket with stage setup
// ========================================================
const stageSocket = new W3cWebSocket('ws://localhost:9000', null);

stageSocket.onerror = () => {
  console.log('not stage server, skip socket connection...');
}

stageSocket.onmessage = (e) => {
    const cur = +store.getState().app.monitor;
    const len = store.getState().app.players.size;

    if (e.data === "client-up") {
        store.dispatch(pause());
        store.dispatch(pause());
        store.dispatch(controlStop());
        store.dispatch(controlUp());
        store.dispatch(push(`monitor/${cur > 1 ? cur - 1 : len}`));
    }
    else if (e.data === "client-down") {
        store.dispatch(pause());
        store.dispatch(pause());
        store.dispatch(controlStop());
        store.dispatch(controlDown());
        store.dispatch(push(`monitor/${cur < len ? cur + 1 : 1}`));
    }
    else if (e.data === "client-left") {
        store.dispatch(controlStop());
        store.dispatch(controlLeft(cur));
    }
    else if (e.data === "client-right") {
        store.dispatch(controlStop());
        store.dispatch(controlRight(cur));
    }
    else if (e.data === "client-interact") {
      store.dispatch(controlStop());
      store.dispatch(controlInteract(cur));
    }
    else if (e.data === "client-stop") {
        store.dispatch(stopControl(cur));
    }
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()
