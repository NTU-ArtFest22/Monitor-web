const stageSocket = (io) => {
    io.onlineCounter = {};

    io.on('connection', (socket) => {
        console.log('connected to stage');

        socket.on('up', () => {
            console.log('up');
            io.emit('echo', 'up');
            io.emit('control', 'up');
        });

        socket.on('down', () => {
            console.log('down');
            io.emit('echo', 'down');
            io.emit('control', 'down');
        });

        socket.on('left', () => {
            console.log('left');
            io.emit('echo', 'left');
            io.emit('control', 'left');
        });

        socket.on('right', () => {
            console.log('right');
            io.emit('echo', 'right');
            io.emit('control', 'right');
        });

        socket.on('interact', () => {
            console.log('interact');
            io.emit('echo', 'interact');
            io.emit('control', 'interact');
        });
    });

    return io;

};

export default stageSocket;
