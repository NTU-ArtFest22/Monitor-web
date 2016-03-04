module.exports = function(io) {

    io.on('connection', function(socket) {
        console.log('connected!');

        socket.on('chat', function(data) {
            var log = {
                user: socket.id,
                user_ip: socket.handshake.address,
                monitor: data.monitor,
                msg: data.msg
            };
            console.log(log);
            io.emit('chat', log);
        });

        socket.on('disconnect', function() {
            console.log('disconnect!');
        });
    });

};
