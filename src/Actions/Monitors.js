import { createAction } from 'redux-actions';
import Firebase from 'firebase';

const counterRef = new Firebase('https://monitor-web.firebaseio.com/counter');

export const switchMonitor = createAction('SWITCH_MONITOR', (curMonitor, monitor) => {
    counterRef.child(curMonitor.toString()).transaction(cur => (cur || 1) - 1);
    counterRef.child(monitor.toString()).transaction(cur => (cur || 0) + 1);
    return monitor;
});
