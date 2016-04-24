import { handleActions } from 'redux-actions';

const App = handleActions({
    SEND_MSG: (state, action) => {
        state.socket.emit('chat', {
            ...action.payload,
            msg: action.payload.msg.substring(0, 100),
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
        state.socket.emit('user_connected', action.payload);
        return {
            ...state,
            monitor: action.payload
        };
    },

    COUNTER_CHANGED: (state, action) => ({
        ...state,
        onlineCounter: action.payload
    }),


    SET_PLAYER: (state, action) => ({
        ...state,
        players: {
            ...state.players,
            [action.payload.monitor]: {
                ...state.players[action.payload.monitor],
                player: action.payload.player
            }
        }
    })
}, {
    onlineCounter: 0,
    socket: {},
    monitor: 1,
    records: [],
    willScroll: true
});

export default App;
