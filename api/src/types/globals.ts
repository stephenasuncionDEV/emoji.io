export enum Direction {
    top = 0, 
    right = 1, 
    bottom = 2, 
    left = 3
}

export type Dimension = {
    width: number,
    height: number
}

export type Player = {
    id?: string, 
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
    viewport: Dimension
}

export type Message = {
    author: string, 
    message: string, 
    color: string,
    isVerified: boolean
}