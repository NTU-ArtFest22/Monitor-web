const stageSocket = (io) => {
    const connections = [];

    io.on('request', (request) => {
        console.log('connected to stage');

        const connection = request.accept(null, request.origin);
        connections.push(connection);
        connection.sendUTF('connected');

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);
                connections.forEach(conn => {
                    conn.sendUTF('client-' + message.utf8Data);
                });
            }
        });
        // connection.on('up', () => {
        //     console.log('up');
        //     connection.sendUTF('up');
        // });
        //
        // connection.on('down', () => {
        //     console.log('down');
        //     connection.sendUTF('down');
        // });
        //
        // connection.on('left', () => {
        //     console.log('left');
        //     connection.sendUTF('left');
        // });
        //
        // connection.on('right', () => {
        //     console.log('right');
        //     connection.sendUTF('right');
        // });
        //
        // connection.on('interact', () => {
        //     console.log('interact');
        //     connection.sendUTF('interact');
        // });
    });

    return io;
};

export default stageSocket;
