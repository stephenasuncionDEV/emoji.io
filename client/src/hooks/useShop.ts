import { useState, useEffect, Dispatch } from 'react'
import { auth } from '@/hooks/useAuth'
import { User } from '@/types/globals'
import { useUser } from '@/providers/UserProvider'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import axios from 'axios'

export interface ShopModal {
    user: User
    setUser: Dispatch<User>
}

export type ShopCategory = {
    name: string,
    key: string
}

export type Product = {
    name: string,
    price: number,
    emoji?: string,
    nameColor?: string
}

export type ShopProducts = {
    [key: string]: Array<Product>
}

export interface ProductDisplay {
    user: User
    product: Product
    onBuy: (product: Product) => void,
    isBuying: boolean
}

export const ShopCategoriesArr: Array<ShopCategory> = [
    { name: '😊 Emoji', key: 'shop_emoji' },
    { name: '🎨 Color', key: 'shop_color' }
]

export const ShopProductsArr: ShopProducts = {
    shop_emoji: [
        { name: 'Face with Tears of Joy', emoji: '😂', price: 5 },
        { name: 'Sparkles', emoji: '✨', price: 5 },
        { name: 'Red Heart', emoji: '❤️', price: 5 },
        { name: 'Fire', emoji: '🔥', price: 5 },
        { name: 'Skull', emoji: '💀', price: 5 },
        { name: 'Thumbs Up', emoji: '👍', price: 5 },
        { name: 'Pleading Face', emoji: '🥺', price: 5 },
        { name: 'Loudly Crying Face', emoji: '😭', price: 5 },
        { name: 'Eyes', emoji: '👀', price: 5 },
        { name: 'Money with Wings', emoji: '💸', price: 5 }
    ],
    shop_color: [
        { name: 'Red', nameColor: 'red', price: 10 },
        { name: 'Blue', nameColor: 'blue', price: 10 },
        { name: 'Green', nameColor: 'green', price: 10 },
        { name: 'Yellow', nameColor: 'yellow', price: 10 }
    ]
}

export const getProductCategory = (product: Product) => {
    const map = {
        shop_emoji: product.emoji !== undefined,
        shop_color: product.nameColor !== undefined
    } 
    const [key] = Object.entries(map).filter(([key, value]) => value === true)[0];
    return key;
}

export const useShop = ({ user, setUser }: ShopModal) => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const [category, setCategory] = useState<string>('shop_emoji');
    const [isBuying, setIsBuying] = useState<boolean>(false);

    const onBuy = async (product: Product) => {
        try {
            const category = getProductCategory(product);

            if (category === 'shop_emoji' && user.player.emojiOwned.includes(product.emoji!)) throw new Error('User already have this product');
            if (category === 'shop_color' && user.player.nameColorOwned.includes(product.nameColor!)) throw new Error('User already have this product');

            setIsBuying(true);

            setIsBuying(false);
        }
        catch (err: any) {
            setIsBuying(false);
            console.error(err);
            let msg = 'Something wrong occured';
            if (err.response) msg = err.response.data.message
            else if (err.request)  msg = err.request.data.message
            else msg = err.message
            toast({
                description: msg
            })
        }
    }

    return {
        category,
        setCategory,
        onBuy,
        isBuying
    }
}