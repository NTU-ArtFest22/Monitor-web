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

export const controlInteract = createAction('CONTROL_INTERACT', (monitor) => {
    client.publish('robot003', JSON.stringify({
        "uid": clientId,
        "target": "clapper"
    }));
});
