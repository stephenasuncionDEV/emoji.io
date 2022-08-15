import { Server, Socket } from 'socket.io'
import { KeyStateData, Viewport } from '../interfaces/globals'
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

    const movePlayer = function (this: Socket, keyStateObj: KeyStateData & Viewport) {
        const socket = this;

        if (!players) return;

        const { 
            width, height,
            ArrowUp, ArrowDown, ArrowLeft, ArrowRight, w, s, a, d, ' ': space 
        } = keyStateObj;

        const up = ArrowUp || w || space;
        const down = ArrowDown || s;
        const left = ArrowLeft || a;
        const right = ArrowRight || d;

        let player = players[socket.id];

        if (!player) return;

        player.viewport.width = width;
        player.viewport.height = height;

        if (up && !player.isJumping) {
            player.dY -= gamePhysics.jumpVelocity;
            player.isJumping = true;
        }
        
        if (down) {
            player.dY += gamePhysics.jumpVelocity;
        }

        if (player.x + 20) { // < width
            if (player.isJumping && right) {
                player.dX += gamePhysics.sideJumpVelocity;
            }
            if (right) {
                player.dX += gamePhysics.playerSpeed;
                player.direction = 0;
            } 
        }

        if (player.x > 0) {
            if (player.isJumping && left) {
                player.dX -= gamePhysics.sideJumpVelocity;
            }
            if (left) {
                player.dX -= gamePhysics.playerSpeed;
                player.direction = 0;
            }
        }

        player.dY += gamePhysics.gravity;
        player.x += player.dX;
        player.y += player.dY;
        player.dX *= 0.9;
        player.dY *= 0.9;

        if (player.x + player.dX < 0) {
            player.x = player.size;
        }

        if (player.x > width) {
            player.x = width - player.dX - player.size;
        }

        if (player.y >= height - player.size) {
            player.isJumping = false;
            player.y = height - player.size;
        }
    }

    const sendMessage = function (messageData: Message) {
        const msg: Message = {
            ...messageData,
            isVerified: messageData.user.email === 'stephenasuncion01@gmail.com'
        }
        io.emit('receive-message', msg);
    }

    const disconnect = function (this: Socket) {
        const socket = this;

        delete players[socket.id];
        io.emit('remove-player', socket.id);

        console.log(`[emoji.io] user <${socket.id}> disconnected`);
    }

    const isConnected = async function (this: Socket, callbackFn: any) {
        const socket = this;

        const allSockets = await io.sockets.allSockets();
        const socketsArr: Array<string> = Array.from(allSockets);
        const connectionStatus = socketsArr.includes(socket.id);

        callbackFn(connectionStatus)
    }

    // Update all players on all clients
    setInterval(() => {
        io.emit('update-players', players);
    }, 1000 / 60);

    return {
        addPlayer,
        movePlayer,
        sendMessage,
        disconnect,
        isConnected
    }
}

export default Listeners