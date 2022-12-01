const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
require('./database/config').dbConnection();

//Express APP
const app = express();

//Reading and parse of body
app.use(express.json() );

//Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static(publicPath) );

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

//My routes
app.use('/api/login', require('./routes/auth'));

server.listen( process.env.PORT, (err) => {
    if( err ) throw new Error(err);
    console.log('Server running in port ', process.env.PORT);
})