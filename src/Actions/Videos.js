import { createAction } from 'redux-actions';

export const setPlayer = createAction('SET_PLAYER', (player, monitor) => ({
    player, monitor
}));
