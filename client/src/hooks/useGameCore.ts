import { KeyState, Viewport } from '@/interfaces/globals'
import { PlayerData, Direction, Dimension, Message, Chat } from '@/types/globals'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useUser } from '@/providers/UserProvider'
import { Socket } from 'socket.io-client'
import canvasTxt from 'canvas-txt'

let players: any = {};

let keyStateObj: KeyState = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false,
    f: false,
    ' ': false
}

let viewportObj: Viewport = {
    width: 1903,
    height: 873
}

export class Player {
    id: string; 
    name: string; 
    emoji: string; 
    size: number; 
    nameColor: string; 
    x: number; 
    y: number; 
    dX: number; 
    dY: number; 
    isJumping: boolean; 
    dir: Direction; 
    viewport: Dimension;
    message: Chat;

    constructor(playerData: Player) {
        const { id, name, emoji, size, nameColor, x, y, dX, dY, isJumping, dir, viewport, message } = playerData;

        this.id = id;
        this.name = name;
        this.emoji = emoji;
        this.size = size;
        this.nameColor = nameColor;
        this.x = x;
        this.y = y;
        this.dX = dX;
        this.dY = dY;
        this.isJumping = isJumping;
        this.dir = dir;
        this.viewport = viewport;
        this.message = message;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { width: playerViewWidth, height: playerViewHeight } = this.viewport;
        const { width: curUserViewWidth, height: curUserViewHeight } = viewportObj;

        const sameViewport = playerViewWidth === curUserViewWidth && playerViewHeight === curUserViewHeight;

        const curX = this.x * curUserViewWidth / playerViewWidth;
        const curY = curUserViewHeight - (playerViewHeight - this.y);

        const x = sameViewport ? this.x : curX;
        const y = sameViewport ? this.y : curY;

        ctx.font = `${this.size.toString()}px Poppins`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, x, y);

        ctx.font = '18px Poppins';
        ctx.fillStyle = this.nameColor || 'black';
        ctx.fillText(this.name, x, y - (this.size + 2));

        if (!this.message) return;
        if (!this.message.state) return;

        this.drawChat(ctx, x, y);
    }

    drawChat(ctx: CanvasRenderingContext2D, x: number, y: number) {
        const w = 120;
        const h = 70;
        let r = 10;
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;

        const colorMode = localStorage.getItem('chakra-ui-color-mode') || 'light';

        let x2 = x - (w / 2);
        let y2 = y - h - this.size - 25;

        ctx.save();
        ctx.shadowColor = colorMode === 'light' ? 'rgb(200,200,200)' : 'rgb(20,20,20)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(x2 + r, y2);
        ctx.arcTo(x2 + w, y2, x2 + w, y2 + h, r);
        ctx.arcTo(x2 + w, y2 + h, x2, y2 + h, r);
        ctx.arcTo(x2, y2 + h, x2, y2, r);
        ctx.arcTo(x2, y2, x2 + w, y2, r);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();

        ctx.font = '10pt Inter';
        ctx.fillStyle = 'black';

        const { message } = this.message.chat;

        let msg = message;
        if (message.length > 75) msg = `${message.slice(0, 72)}...`;

        canvasTxt.drawText(ctx, msg, x2 + 2.5, y2 - 5, w - 2.5, h);
    }

    update(playerData: Player) {
        const { id, name, emoji, size, x, y, dX, dY, isJumping, dir, viewport } = playerData;

        this.id = id;
        this.name = name;
        this.emoji = emoji;
        this.size = size;
        this.x = x;
        this.y = y;
        this.dX = dX;
        this.dY = dY;
        this.isJumping = isJumping;
        this.dir = dir;
        this.viewport = viewport;
    }

    displayChat(messageData: Message, interval: number) {
        this.message = {
            state: true,
            chat: messageData
        } as Chat

        setTimeout(() => {
            this.message.state = false;
        }, interval)
    }
}

export interface GameCoreProps {
    socket: Socket;
    isChatOpen: boolean;
    onDCModalOpen: () => void;
    onChatOpen: () => void;
    onChatClose: () => void;
}

export const useGameCore = ({ socket, isChatOpen, onDCModalOpen, onChatOpen, onChatClose }: GameCoreProps) => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const ctxRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const { user } = useUser();

    // Check if still connected
    useEffect(() => {
        const checkConnection = setInterval(() => {
            try {
                socket.emit('isConnected', (result: any) => {
                    if (!result) onDCModalOpen();
                });
            }
            catch (err) {
                console.error(err);
            }
        }, 1000 * 10);
        
        return () => clearInterval(checkConnection);
    }, [])

    // Render Game Graphics
    useEffect(() => {
        if (!canvasRef || !players) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx!;

        if (!ctx) return;

        const render: any = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            RenderPlayers(ctx);
            requestAnimationFrame(render);
        }
        render();

        return () => cancelAnimationFrame(render);

    }, [canvasRef, players])

    // Add player on user join
    useEffect((): any => {
        if (!Object.keys(user).length) return;

        const { player: { size, nameColor, emoji }, name } = user;

        const newPlayer: PlayerData = {
            id: '',
            name, 
            emoji,
            size,
            nameColor,
            x: 48,
            y: 48,
            dX: 10, 
            dY: 10, 
            isJumping: false, 
            dir: 0,
            viewport: viewportObj
        }

        socket.on('add-player', (playerData) => {
            AddPlayer(playerData);
        })

        socket.emit('add-player', newPlayer);

        return (): any => socket.off('add-player');
    }, [user])

    // Remove Player Socket Listener
    useEffect((): any => {
        socket.on('remove-player', (socketId) => {
            RemovePlayer(socketId);
        });

        return () => socket.off('remove-player')
    }, [])

     // Update all players
     useEffect((): any => {
        if (!players) return;

        socket.on('update-players', (playersObj) => {
            UpdatePlayers(playersObj);
        });

        return () => socket.off('update-players');
    }, [players])

    // Player movement socket
    useEffect(() => {
        const interval = setInterval(() => {
            try {
                socket.emit('move-player', { ...keyStateObj, ...viewportObj });
                
                if (!canvasRef.current) return;
                viewportObj.width = canvasRef.current.width || 1903;
                viewportObj.height = canvasRef.current.height || 873;
            }
            catch (err) {
                console.error(err);
            }
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, []);

    // Chat Message Listener
    useEffect((): any => {
        socket.on('receive-message-game', (messageData: Message) => {
            MessagePlayer(messageData);
        });
        return () => socket.off('receive-message-game')
    }, [])

    // Key Down Listener
    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            if (e.key === 'Enter') onChatOpen();
            if (e.key === 'Escape') onChatClose(); 

            if (!isChatOpen && (e.key === 'ArrowUp' || 
            e.key === 'ArrowDown' || 
            e.key === ' ' || 
            e.key === 'ArrowLeft' || 
            e.key === 'ArrowRight' || 
            e.key === 'a' || 
            e.key === 'd')) e.preventDefault();

            if (Object.keys(keyStateObj).indexOf(e.key) === -1) return;

            if (isChatOpen) return;

            keyStateObj[e.key as keyof KeyState] = true;
        }
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
    }, [isChatOpen])

    // Key Up Listener
    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            if (Object.keys(keyStateObj).indexOf(e.key) === -1) return;

            keyStateObj[e.key as keyof KeyState] = false;
        }
        window.addEventListener('keyup', keyListener);
        return () => window.removeEventListener('keyup', keyListener);
    }, [])


    const AddPlayer = (playerData: PlayerData) => {
        try {
            let newPlayers: any = { ...players };
            newPlayers[playerData.id] = new Player(playerData as Player);
            players = newPlayers;
        }
        catch (err) {
            console.error(err);
        }
    }

    const RenderPlayers = (ctx: CanvasRenderingContext2D) => {
        try {
            Object.values(players).forEach((player: any) => {
                player.draw(ctx);
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    const UpdatePlayers = (playersObj: any) => {
        try {
            Object.entries(players).forEach((playerData: any) => {
                const [socketId, player] = playerData;
                player.update(playersObj[socketId]);
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    const RemovePlayer = (socketId: string) => {
        try {
            let newPlayers: any = { ...players };
            delete newPlayers[socketId];
            players = newPlayers;
        }
        catch (err) {
            console.error(err);
        }
    }

    const MessagePlayer = (messageData: Message) => {
        try {
            const { socketId } = messageData;
            players[socketId!].displayChat(messageData, 5000);
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        canvasRef
    }
}