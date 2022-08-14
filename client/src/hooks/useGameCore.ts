import type { NextPage } from 'next'
import { KeyStateData } from '@/interfaces/globals'
import { PlayerData, Direction, Dimension } from '@/types/globals'
import { MutableRefObject, useEffect, useRef, EffectCallback } from 'react'
import { Flex } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { io, Socket } from 'socket.io-client'
import config from '@/config/index'

const socket = io(config.socketUrl as string);

let keyStateObj: KeyStateData = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false,
    f: false,
    ' ': false,
    viewport: {
        width: 1903,
        height: 873
    }
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
        const { width: curUserViewWidth, height: curUserViewHeight } = keyStateObj.viewport;

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
}

export const useGameCore = () => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const { user } = useUser();

    // Add player on user join
    useEffect((): any => {
        if (!Object.keys(user).length) return;

        const { player: { size, nameColor, emoji }, name } = user;

        const newPlayer: PlayerData = {
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
            viewport: keyStateObj.viewport
        }

        socket.on('add-player', (playerData) => {
            AddPlayer(playerData);
        })

        socket.emit('add-player', newPlayer);

        return (): any => socket.off('add-player');
    }, [user])

    const AddPlayer = (playerData: PlayerData) => {

    }

    return {
        canvasRef
    }
}