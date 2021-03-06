import { createAction } from 'redux-actions';
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://guest:NTUARTNJP@140.112.91.176:9001/');
let clientId = "";

client.on('connect', () => {
    console.log('connected to mqtt');
    clientId = client.options.clientId;
    client.subscribe('robot003');
});

client.on('message', (topic, message) => {
    console.log(topic, message.toString());
});

export const setPlayer = createAction('SET_PLAYER');

export const controlUp = createAction('CONTROL_UP');
export const controlDown = createAction('CONTROL_DOWN');

export const controlLeft = createAction('CONTROL_LEFT', (monitor) => {
    client.publish('robot003', JSON.stringify({
        "uid": clientId,
        "target": "baseServo",
        "rotate": "start",
        "dir": "counterClockwise"
    }));
});

export const controlRight = createAction('CONTROL_RIGHT', (monitor) => {
    client.publish('robot003', JSON.stringify({
        "uid": clientId,
        "target": "baseServo",
        "rotate": "start",
        "dir": "clockwise"
    }));
});

export const stopControl = createAction('STOP_CONTROL', (monitor) => {
    client.publish('robot003', JSON.stringify({
        "uid": clientId,
        "target": "baseServo",
        "rotate": "stop"
    }));
});

export const controlStop = createAction('CONTROL_STOP');
export const controlPause = createAction('CONTROL_PAUSE');
export const controlSetPause = createAction('CONTROL_SET_PAUSE');
export const controlSetPlay = createAction('CONTROL_SET_PLAY');

export const controlInteract = createAction('CONTROL_INTERACT', (monitor) => {
    client.publish('robot003', JSON.stringify({
        "uid": clientId,
        "target": "clapper"
    }));
});

export const onError = createAction('ON_ERROR');
export const onLoad = createAction('ON_LOAD');

export const updateFrames = createAction('UPDATE_FRAMES', (monitor, src) => ({ monitor, src }));

export const toggleLoading = createAction('TOGGLE_LOADING');
export const pause = createAction('PAUSE');
export const reload = createAction('RELOAD');
