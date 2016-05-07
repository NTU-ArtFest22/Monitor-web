import { handleActions } from 'redux-actions';
import Firebase from 'firebase';
import { getColor } from 'random-material-color';
import { OrderedMap } from 'immutable';

const counterRef = new Firebase('https://monitor-web.firebaseio.com/counter');

const App = handleActions({
    CONFIGURE_FIREBASE: (state, action) => ({
        ...state,
        fireRef: action.payload
    }),
    SAVE_UID: (state, action) => ({
        ...state,
        uid: action.payload
    }),

    SET_MSG_TO_LIST: (state, action) => ({
        ...state,
        records: OrderedMap(action.payload).map(record => ({ ...record, inActive: true }))
    }),

    ADD_MSG_TO_LIST: (state, action) => ({
        ...state,
        records: state.records.set(action.payload.key, action.payload.value)
    }),

    REMOVE_MSG_FROM_LIST: (state, action) => ({
        ...state,
        records: state.records.delete(action.payload)
    }),

    SET_WILL_SCROLL: (state, action) => ({
        ...state,
        willScroll: action.payload
    }),

    SWITCH_MONITOR: (state, action) => {
        // state.socket.emit('user_connected', action.payload);
        counterRef.child(state.monitor.toString()).transaction(cur => (cur || 1) - 1);
        counterRef.child(action.payload.toString()).transaction(cur => (cur || 0) + 1);

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
        player: action.payload
    }),

    TOGGLE_SHOW_CHAT: (state) => ({
        ...state,
        showChat: !state.showChat
    }),

    CONTROL_UP: state => ({
        ...state,
        control: 'up'
    }),
    CONTROL_DOWN: state => ({
        ...state,
        control: 'down'
    }),
    CONTROL_LEFT: state => ({
        ...state,
        control: 'left'
    }),
    CONTROL_RIGHT: state => ({
        ...state,
        control: 'right'
    }),
    STOP_CONTROL: state => ({
        ...state,
        control: 'stop'
    }),
    CONTROL_INTERACT: state => ({
        ...state,
        control: 'interact'
    })
}, {
    onlineCounter: 0,
    socket: {},
    monitor: 1,
    records: OrderedMap(),
    willScroll: true
});

export default App;
