import { Server, Socket } from 'socket.io'
import { Player, Message } from '../types/globals'
import { gamePhysics } from './physics'

const Listeners = (io: Server) => {
    let players: any = {};

    const addPlayer = function (this: Socket, playerData: Player) {
        const socket = this;

        players[socket.id] = { ...playerData, id: socket.id };

        Object.values(players).filter((pData: any) => pData.id !== playerData.id).forEach((curPlayerData: any) => {
            socket.emit('add-player', curPlayerData);
        })

        io.emit('add-player', { ...playerData, id: socket.id });
    }

    const sendMessage = function (messageData: Message) {
        io.emit('receive-message', messageData);
    }

    const disconnect = function (this: Socket) {
        const socket = this;

        delete players[socket.id];
        io.emit('remove-player', socket.id);

        console.log(`[emoji.io] user <${socket.id}> disconnected`);
    }

    return {
        addPlayer,
        sendMessage,
        disconnect
    }
}

export default Listeners