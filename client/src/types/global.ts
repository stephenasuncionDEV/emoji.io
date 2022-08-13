import { ReactNode } from 'react'

export type MetaProps = {
    title: String
}

export type Props = {
    children: ReactNode
}

export type Player = {
    emoji: String,
    emojiOwned: Array<String>,
    nameColor: String,
    size: Number
}

export type User = {
    _id: String,
    email: String,
    firebase_uid: String,
    name: String,
    player: Player,
    createdAt: String,
    updatedAt: String
}