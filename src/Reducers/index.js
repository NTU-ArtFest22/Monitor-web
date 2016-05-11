import { handleActions } from 'redux-actions';
import { Map, OrderedMap } from 'immutable';
import initialState from '../store/initialState';

const App = handleActions({
    CONFIGURE_FIREBASE: (state, action) => ({
        ...state,
        fireRef: action.payload
    }),
    SAVE_UID: (state, action) => ({
        ...state,
        uid: action.payload
    }),
    SAVE_USER_REF: (state, action) => ({
        ...state,
        userRef: action.payload
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

    SWITCH_MONITOR: (state, action) => ({
        ...state,
        monitor: action.payload
    }),

    SET_PRESENCE: (state, action) => ({
      ...state,
      presence: Map(action.payload)
    }),
    COUNTER_CHANGED: (state, action) => ({
      ...state,
      onlineCounter: state.onlineCounter.update(
          state.presence.get(action.payload.key), 1,
          v => v - 1
        ).update(
          action.payload.value.toString(), 0,
          v => v + 1
        ),
      presence: state.presence.set(action.payload.key, action.payload.value)
    }),
    COUNTER_ADDED: (state, action) => ({
      ...state,
      onlineCounter: state.onlineCounter.update(
        action.payload.value.toString(), 0,
        v => v + 1
      ),
      presence: state.presence.set(action.payload.key, action.payload.value)
    }),
    COUNTER_REMOVED: (state, action) => ({
      ...state,
      onlineCounter: state.onlineCounter.update(
        action.payload.value.toString(), 1,
        v => v - 1
      ),
      presence: state.presence.delete(action.payload.key)
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
    CONTROL_STOP: state => ({
      ...state,
      control: 'stop'
    }),
    STOP_CONTROL: state => ({
        ...state,
        // control: 'stop'
    }),
    CONTROL_INTERACT: state => ({
        ...state,
        control: 'interact'
    }),
    ON_ERROR: (state, action) => ({
      ...state,
      players: state.players.update(
        action.payload.toString(),
        r => r.set("error", true)
      )
    }),
    ON_LOAD: (state, action) => ({
      ...state,
      players: state.players.update(
        action.payload.toString(),
        r => r.set("error", false)
      )
    }),
    UPDATE_FRAMES: (state, action) => ({
      ...state,
      players: state.players.update(
        action.payload.monitor.toString(),
        r => r.update("frames", frames => frames.push(action.payload.src).takeLast(10))
      )
    }),
    PAUSE: (state) => ({
      ...state,
      pause: !state.pause
    }),
    RELOAD: state => ({
      ...state,
      reload: Math.floor(Math.random() * 10000).toString()
    })
}, initialState);

export default App;
