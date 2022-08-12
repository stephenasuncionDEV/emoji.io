// Dependencies
import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors, { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors'
import { createServer } from 'http'
import errorHandler from './src/middlewares/errorHandler'
import CorsHandlerMain from './src/middlewares/corsHandler'
import { Server } from 'socket.io'
import connection from './src/db/connection'
// const router = require('#routes/index.ts');

const app = express();
const server = createServer(app);
const io = new Server(server, { 
    cors: {
        origin: ['http://localhost:3000', 'https://emoji-io.netlify.app']
    }
});

// Cors
const corsOption: CorsOptions | CorsOptionsDelegate<CorsRequest> | undefined = {
    origin: ['http://localhost:3000', 'https://emoji-io.netlify.app'],
    optionsSuccessStatus: 200
}

const { corsHandler } = CorsHandlerMain(corsOption);

// Express Config
app.use(cors(corsOption));
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
    io.on('connection', (socket) => {
        console.log(`[emoji.io] user <${socket.id}> connected`);

        // Socket Listeners
        // socket.on('add-player', addPlayer);
        // socket.on('move-player', movePlayer);
        // socket.on('send-message', sendMessage);
        // socket.on('disconnect', disconnect);
    });
});