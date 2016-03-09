import { lib as emoji } from 'emojilib';

const chatroomSocket = (io) => {
    io.onlineCounter = {};

    io.on('connection', (socket) => {

        socket.on('user connected', (monior) => {
            console.log(socket.id + ' connected!');
            io.onlineCounter[socket.id] = monior;
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
            }
        });
    });

    return io;

};

export default chatroomSocket;
