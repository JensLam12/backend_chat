const { io } = require('../index');

//Sockets Messages
io.on('connection', client => {
    console.log('Connected client');

    client.on('disconnect', () => { 
        console.log('Disconnected client');
    });

    // client.on('message', ( payload ) => {
    //     console.log(payload);

    //     io.emit('message', { admin: 'New message'})
    // });
});