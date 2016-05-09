import { createAction } from 'redux-actions';
import Firebase from 'firebase';

const presenceRef = new Firebase('https://monitor-web.firebaseio.com/presence');
export const userRef = presenceRef.push();

export const switchMonitor = createAction('SWITCH_MONITOR', monitor => {
    userRef.set(monitor);
    return monitor;
});
