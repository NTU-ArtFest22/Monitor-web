import { createAction } from 'redux-actions';

export const sendMsg = createAction('SEND_MSG');

export const addMsgToList = createAction('ADD_MSG_TO_LIST');
export const setWillScroll = createAction('SET_WILL_SCROLL');
