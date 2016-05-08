import { createAction } from 'redux-actions';

export const counterChanged = createAction('COUNTER_CHANGED', (key, value) => ({
  key, value
}));

export const counterAdded = createAction('COUNTER_ADDED', (key, value) => ({
  key, value
}));

export const counterRemoved = createAction('COUNTER_REMOVED', (key, value) => ({
  key, value
}));

export const setPresence = createAction('SET_PRESENCE');
