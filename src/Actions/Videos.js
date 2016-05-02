import { createAction } from 'redux-actions';
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://guest:NTUARTNJP@140.112.91.176:9001');

client.on('connect', () => {
    console.log('connected to mqtt');
    client.subscribe('topic');
});

client.on('message', (topic, message) => {
    console.log(message.toString());
});

export const setPlayer = createAction('SET_PLAYER');

export const sendControlMsg = createAction('SEND_CONTROL_MSG', (msg, monitor) => {
    client.publish('topic', JSON.stringify(msg));
});
