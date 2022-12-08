const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { connectUser, disconnectUser, saveMessage } = require('../controllers/socketController');

//Sockets Messages
io.on('connection', client => {
    console.log('Connected client');

    console.log( client.handshake.headers['x-token']);

    const [valid, uuid] = validateJWT( client.handshake.headers['x-token'] );
    if( !valid ) { return client.disconnect() }
    
    //Authenticated user
    connectUser(uuid);

    //Introduce the use to a room
    // global room, client.id
    client.join(uuid);
    client.to(uuid).emit('');

    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload );
    });

    client.on('disconnect', () => { 
        console.log('Disconnected client');
        disconnectUser(uuid);
    });
});