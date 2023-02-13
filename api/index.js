const express = require( 'express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require( 'path')
const { Server} = require( "socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'index.html'))
})

io.on('connection', ( socket) => {
    io.emit( 'new user', () => {
        console.log( "a user is connected");
    })
    
    socket.on( 'disconnect', () => {
        io.emit( 'disconnected', () => {
            console.log( 'user disconnected');
        })
    })
    
    socket.on( 'chat message', ( msg) => {
        io.emit( 'chat message', msg)
        console.log( 'message: ' + msg);
    })
})

server.listen( 3000, () => {
    console.log('listening on *:3000')
})