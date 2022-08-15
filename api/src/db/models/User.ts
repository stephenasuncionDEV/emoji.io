import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    firebase_uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    player: {
        size: {
            type: Number,
            default: 36
        },
        nameColor: {
            type: String,
            default: 'black'
        },
        emoji: {
            type: String,
            default: '🐭'
        },
        emojiOwned: {
            type: Array,
            default: []
        },
        nameColorOwned: {
            type: Array,
            default: []
        }
    }

}, { timestamps: true });

export const User = mongoose.model('user', UsersSchema);