// Dependencies
require('dotenv').config();
const path = require('path');
const express = require('express');
const { Express } = require('express');
const cors = require('cors');
// const router = require('#routes/index.ts');

const app = express();
const server = require('http').Server(app);
const errorHandler = require('#middlewares/errorHandler.ts');
const io = require('socket.io')(server, { 
    cors: {
        origin: ['http://localhost:3000', 'https://emoji-io.netlify.app']
    }
});

// Database
const connection = require('#db/connection.ts');

// Cors
const corsOption = {
    origin: ['http://localhost:3000', 'https://emoji-io.netlify.app'],
    optionsSuccessStatus: 200
}

const { corsHandler } = require('#middlewares/corsHandler.ts')(corsOption);

// Express Config
app.options(cors(corsOption));
app.use(corsHandler);
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
// app.use('/api/v1', router);
app.use(errorHandler);

// Connections
connection.once('open', () => {
    console.log("[emoji.io] Connected to MongoDB")

    server.listen(process.env.PORT || 8080, () => {
        console.log(`[emoji.io] listening at http://localhost:${process.env.PORT || 8080}`)
    })

    // Web Socket Connection
    io.on('connection', (socket: any) => {
        console.log(`[emoji.io] user <${socket.id}> connected`);

        // Socket Listeners
        // socket.on('add-player', addPlayer);
        // socket.on('move-player', movePlayer);
        // socket.on('send-message', sendMessage);
        // socket.on('disconnect', disconnect);
    });
});