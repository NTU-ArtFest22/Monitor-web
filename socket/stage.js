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
    });

    return io;
};

export default stageSocket;
