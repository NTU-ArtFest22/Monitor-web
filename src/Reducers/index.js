import { handleActions } from 'redux-actions';

const App = handleActions({
    SEND_MSG: (state, action) => {
        state.socket.emit('chat', {
            monitor: state.monitor,
            msg: action.payload
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
    monitor: 1,
    records: [],
    willScroll: true
});

export default App;
