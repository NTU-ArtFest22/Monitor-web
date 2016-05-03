import { createAction } from 'redux-actions';
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://guest:NTUARTNJP@140.112.91.176:9001');

client.on('connect', () => {
    console.log('connected to mqtt');
    client.subscribe('robot123');
    client.publish('robot123', JSON.stringify({
        "target": "baseServo",
        "angle": 15
    }));
});

client.on('message', (topic, message) => {
    console.log(message.toString());
});

export const setPlayer = createAction('SET_PLAYER');

export const sendControlMsg = createAction('SEND_CONTROL_MSG', (msg, monitor) => {
    client.publish('topic', JSON.stringify(msg));
});

export const controlLeft = createAction('CONTROL_LEFT', (monitor) => {
    client.publish('robot123', JSON.stringify({
        "target": "baseServo",
        "angle": 15
    }));
});

export const controlRight = createAction('CONTROL_RIGHT', (monitor) => {
    client.publish('robot123', JSON.stringify({
        "target": "baseServo",
        "angle": -15
    }));
});
