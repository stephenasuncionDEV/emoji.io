import { KeyState, Viewport } from '@/interfaces/globals'
import { PlayerData, Direction, Dimension } from '@/types/globals'
import { MutableRefObject, useEffect, useRef, useLayoutEffect } from 'react'
import { useUser } from '@/providers/UserProvider'
import { Socket } from 'socket.io-client'

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

    constructor(playerData: Player) {
        const { id, name, emoji, size, nameColor, x, y, dX, dY, isJumping, dir, viewport } = playerData;

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
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { width: playerViewWidth, height: playerViewHeight } = this.viewport;
        const { width: curUserViewWidth, height: curUserViewHeight } = viewportObj;

        const sameViewport = playerViewWidth === curUserViewWidth && playerViewHeight === curUserViewHeight;

        const curX = this.x * curUserViewWidth / playerViewWidth;
        const curY = curUserViewHeight - (playerViewHeight - this.y);

        ctx.font = `${this.size.toString()}px Poppins`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, sameViewport ? this.x : curX, sameViewport ? this.y : curY);

        ctx.font = '18px Poppins';
        ctx.fillStyle = this.nameColor || 'black';
        ctx.fillText(this.name, sameViewport ? this.x : curX, sameViewport ? this.y - (this.size + 2) : curY - (this.size + 2));
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
}

export interface GameCoreProps {
    socket: Socket;
    onDCModalOpen: () => void;
    onChatOpen: () => void;
    onChatClose: () => void;
}

export const useGameCore = ({ socket, onDCModalOpen, onChatOpen, onChatClose }: GameCoreProps) => {
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
    useLayoutEffect(() => {
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

    // Key Down Listener
    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            if (e.key === 'Enter') onChatOpen();
            if (e.key === 'Escape') onChatClose(); 

            if (e.key === 'ArrowUp' || 
            e.key === 'ArrowDown' || 
            e.key === ' ' || 
            e.key === 'ArrowLeft' || 
            e.key === 'ArrowRight' || 
            e.key === 'a' || 
            e.key === 'd') e.preventDefault();

            if (Object.keys(keyStateObj).indexOf(e.key) === -1) return;

            keyStateObj[e.key as keyof KeyState] = true;
        }
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
    }, [])

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

    return {
        canvasRef
    }
}