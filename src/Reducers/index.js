import { handleActions } from 'redux-actions';

const App = handleActions({
    SEND_MSG: (state, action) => {
        state.socket.emit('chat', action.payload);
        return state;
    },

    ADD_MSG_TO_LIST: (state, action) => ({
        ...state,
        records: [
            ...state.records,
            action.payload
        ]
    })
}, {
    records: []
});

export default App;
