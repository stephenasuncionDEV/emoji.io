import { ReactNode } from 'react'
import { Viewport } from '@/interfaces/globals'

export enum Direction {
    top = 0, 
    right = 1, 
    bottom = 2, 
    left = 3
}

export type MetaProps = {
    title: string
}

export type Props = {
    children: ReactNode
}

export type PlayerObj = {
    emoji: string,
    emojiOwned: Array<string>,
    nameColor: string,
    nameColorOwned: Array<string>,
    size: number
}

export type User = {
    _id: string,
    email: string,
    firebase_uid: string,
    name: string,
    player: PlayerObj,
    createdAt: string,
    updatedAt: string
}

export type Dimension = {
    width: number,
    height: number
}

export type Chat = {
    state: boolean,
    chat: Message
}

export type PlayerData = {
    id: string, 
    name: string, 
    emoji: string, 
    size: number, 
    nameColor: string, 
    x: number, 
    y: number, 
    dX: number, 
    dY: number, 
    isJumping: boolean, 
    dir: Direction, 
    viewport: Viewport | Dimension,
    message?: Chat
}

export type Message = {
    author: string, 
    message: string, 
    color: string,
    isVerified: boolean,
    user: User,
    socketId?: string
}