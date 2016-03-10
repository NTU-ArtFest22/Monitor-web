import { lib as emoji } from 'emojilib';

function mapListToCounter(onlineCounter) {
    return Object.keys(onlineCounter)
        .reduce( (counters, id) => {
            let monitor = onlineCounter[id];
            counters[monitor] = counters[monitor] ? counters[monitor] + 1 : 1;
            return counters;
        }, {});
}

const chatroomSocket = (io) => {
    io.onlineCounter = {};

    io.on('connection', (socket) => {

        socket.on('user_connected', (monitor) => {
            console.log(socket.id + ' connected!');
            io.onlineCounter[socket.id] = monitor;
            io.emit('counter_changed', mapListToCounter(io.onlineCounter));
        });

        socket.on('chat', (data) => {
            let parseMsg = data.msg.replace(/:([0-9a-z_]+):/g, (match, p1) => (
                emoji[p1] ? emoji[p1].char : match
            ));

            let log = {
                ...data,
                user: socket.id,
                user_ip: socket.handshake.address,
                msg: parseMsg,
                received_time: Date.now()
            };
            console.log(log);
            io.emit('chat', log);
        });

        socket.on('disconnect', () => {
            if (io.onlineCounter[socket.id]) {
                console.log(socket.id + ' disconnected!');
                delete io.onlineCounter[socket.id];
                io.emit('counter_changed', mapListToCounter(io.onlineCounter));
            }
        });
    });

    return io;

};

export default chatroomSocket;
