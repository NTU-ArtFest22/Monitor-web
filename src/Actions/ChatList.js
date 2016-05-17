import { createAction } from 'redux-actions';
import Firebase from 'firebase';
import { getColor } from 'random-material-color';

const fireRef = new Firebase('https://monitor-web.firebaseio.com/records');

export const configureFirebase = createAction('CONFIGURE_FIREBASE');
export const saveUid = createAction('SAVE_UID');
export const saveUserRef = createAction('SAVE_USER_REF');

export const sendMsg = createAction('SEND_MSG', data => {
    fireRef.push({
        ...data,
        user_color: getColor({ text: data.user }),
        send_time: Date.now()
    });
    return data;
});

export const setMsgToList = createAction('SET_MSG_TO_LIST');

export const addMsgToList = createAction('ADD_MSG_TO_LIST', (key, value) => ({
    key, value
}));

export const removeMsgFromList = createAction('REMOVE_MSG_FROM_LIST');

export const setWillScroll = createAction('SET_WILL_SCROLL');

export const toggleShowChat = createAction('TOGGLE_SHOW_CHAT');

export const connectedToChat = createAction('CONNECTED_TO_CHAT');
