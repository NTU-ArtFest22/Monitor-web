var emoji = require('emojilib').lib;

module.exports = (io) => {
    "use strict";

    io.on('connection', (socket) => {
        console.log('connected!');

        socket.on('chat', (data) => {
            let parseMsg = data.msg.replace(/:([0-9a-z_]+):/g, (match, p1) => (
                emoji[p1] ? emoji[p1].char : match
            ));
            console.log(parseMsg);

            let log = {
                user: socket.id,
                user_ip: socket.handshake.address,
                monitor: data.monitor,
                msg: parseMsg,
                send_time: data.send_time,
                received_time: Date.now()
            };
            console.log(log);
            io.emit('chat', log);
        });

        socket.on('disconnect', () => {
            console.log('disconnect!');
        });
    });

};
