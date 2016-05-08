import { createAction } from 'redux-actions';

export const switchMonitor = createAction('SWITCH_MONITOR', (userRef, monitor) => {
    userRef.set(monitor);
    return monitor;
});
