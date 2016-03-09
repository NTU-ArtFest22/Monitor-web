import { handleActions } from 'redux-actions';

import io from 'socket.io-client';

// const socket = io('http://localhost:8080');
// socket.on('connect', () => {
//     socket.emit('user connected');
// });

const App = handleActions({
    SEND_MSG: (state, action) => {
        state.socket.emit('chat', {
            ...action.payload,
            monitor: state.monitor
        });
        return state;
    },

    ADD_MSG_TO_LIST: (state, action) => ({
        ...state,
        records: [
            ...state.records,
            action.payload
        ]
    }),

    SET_WILL_SCROLL: (state, action) => ({
        ...state,
        willScroll: action.payload
    }),

    SWITCH_MONITOR: (state, action) => {
        state.socket.emit('switch_monitor', action.payload);
        return {
            ...state,
            monitor: action.payload
        };
    }
}, {
    onlineCounter: 0,
    socket: {},
    monitor: 1,
    records: [],
    willScroll: true
});

export default App;
