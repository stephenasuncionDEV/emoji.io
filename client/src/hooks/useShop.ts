import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { auth } from '@/hooks/useAuth'
import { useUser } from '@/providers/UserProvider'
import { useUserAction } from '@/hooks/useUserAction'
import config from '@/config/index'
import axios from 'axios'

export type ShopCategory = {
    name: string,
    key: string
}

export type Product = {
    name: string,
    price: number,
    value: string
    category: 'shop_emoji' | 'shop_color'
}

export type ShopProducts = {
    [key: string]: Array<Product>
}

export interface ProductDisplay {
    product: Product
    onBuy: (product: Product) => void,
    isBuying: boolean,
    isOwned: (product: Product) => boolean
}

export const ShopCategoriesArr: Array<ShopCategory> = [
    { name: '😊 Emoji', key: 'shop_emoji' },
    { name: '🎨 Color', key: 'shop_color' }
]

export const ShopProductsArr: ShopProducts = {
    shop_emoji: [
        { name: 'Face with Tears of Joy', value: '😂', price: 5, category: 'shop_emoji' },
        { name: 'Sparkles', value: '✨', price: 5, category: 'shop_emoji' },
        { name: 'Red Heart', value: '❤️', price: 5, category: 'shop_emoji' },
        { name: 'Fire', value: '🔥', price: 5, category: 'shop_emoji' },
        { name: 'Skull', value: '💀', price: 5, category: 'shop_emoji' },
        { name: 'Thumbs Up', value: '👍', price: 5, category: 'shop_emoji' },
        { name: 'Pleading Face', value: '🥺', price: 5, category: 'shop_emoji' },
        { name: 'Loudly Crying Face', value: '😭', price: 5, category: 'shop_emoji' },
        { name: 'Eyes', value: '👀', price: 5, category: 'shop_emoji' },
        { name: 'Money with Wings', value: '💸', price: 5, category: 'shop_emoji' }
    ],
    shop_color: [
        { name: 'Red', value: 'red', price: 10, category: 'shop_color' },
        { name: 'Blue', value: 'blue', price: 10, category: 'shop_color' },
        { name: 'Green', value: 'green', price: 10, category: 'shop_color' },
        { name: 'Yellow', value: 'yellow', price: 10, category: 'shop_color' }
    ]
}

export const useShop = () => {
    const { user } = useUser();
    const router = useRouter();
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { addEmoji, addNameColor } = useUserAction();
    const [category, setCategory] = useState<string>('shop_emoji');
    const [isBuying, setIsBuying] = useState<boolean>(false);

    // retrieve session callback
    useEffect(() => {
        if (!Object.keys(router.query).length) return;
        
        const { session_id } = router.query;

        retrieveSession(session_id as string);

    }, [router])

    const onBuy = async (product: Product) => {
        try {
            const alreadyOwned = isOwned(product);

            if (alreadyOwned) throw new Error('User already have this product');

            setIsBuying(true);

            const accessToken = await auth.currentUser?.getIdToken();

            const { name, price, value, category } = product;

            const res = await axios.post(`${config.serverUrl}/api/v1/payment/createCheckout`, {
                userId: user._id,
                product: {
                    name: `${name} - (${value})`,
                    value,
                    category
                },
                price
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            setIsBuying(false);

            if (res.status !== 200) return;

            localStorage.setItem('emojiio-session', '01242002');

            router.push(res.data.url);
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

    const isOwned: ((product: Product) => boolean) = (product) => {
        return {
            shop_emoji: user.player.emojiOwned.includes(product.value!),
            shop_color: user.player.nameColorOwned.includes(product.value!)
        }[product.category]
    }

    const retrieveSession = async (sessionId: string) => {
        try {
            const isSession = localStorage.getItem('emojiio-session');
            if (!isSession || isSession !== '01242002') return;

            setIsBuying(true);

            const accessToken = await auth.currentUser?.getIdToken();

            // get session information
            const res = await axios.get(`${config.serverUrl}/api/v1/payment/getSession`, {
                params: {
                    sessionId
                },
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            setIsBuying(false);

            if (res.status !== 200) return;

            const { 
                payment_status, 
                amount_total,
                payment_method_types,
                customer,
                metadata: { value, userId, category },
                customer_details: { email, name, phone }
            } = res.data;

            if (payment_status !== 'paid') return;

            localStorage.removeItem('emojiio-session');

            if (category === 'shop_emoji') await addEmoji(value);
            else if (category === 'shop_color') await addNameColor(value);

            toast({
                title: 'Success',
                description: `Successfully Purchased Product: ${value}`,
                status: 'success'
            })
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
        isBuying,
        isOwned
    }
}