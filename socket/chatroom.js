import { lib as emoji } from 'emojilib';

const chatroomSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('connected!');

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
            console.log('disconnect!');
        });
    });

    return io;

};

export default chatroomSocket;
