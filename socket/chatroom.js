module.exports = (io) => {
    "use strict";

    io.on('connection', (socket) => {
        console.log('connected!');

        socket.on('chat', (data) => {
            let log = {
                user: socket.id,
                user_ip: socket.handshake.address,
                monitor: data.monitor,
                msg: data.msg
            };
            console.log(log);
            io.emit('chat', log);
        });

        socket.on('disconnect', () => {
            console.log('disconnect!');
        });
    });

};
