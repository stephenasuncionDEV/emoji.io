import { ReactNode } from 'react'

export type MetaProps = {
    title: string
}

export type Props = {
    children: ReactNode
}

export type Player = {
    emoji: string,
    emojiOwned: Array<string>,
    nameColor: string,
    size: number
}

export type User = {
    _id: string,
    email: string,
    firebase_uid: string,
    name: string,
    player: Player,
    createdAt: string,
    updatedAt: string
}

export type Dimension = {
    width: number,
    height: number
}