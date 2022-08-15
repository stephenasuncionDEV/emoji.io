import { useState } from 'react'
import { auth } from '@/hooks/useAuth'
import { useUser } from '@/providers/UserProvider'
import { useToast } from '@chakra-ui/react'
import { User } from '@/types/globals'
import config from '@/config/index'
import axios from 'axios'

export const useUserAction = () => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { user, setUser } = useUser();
    const [isSettingEmoji, setIsSettingEmoji] = useState<boolean>(false);
    const [isSettingNameColor, setIsSettingNameColor] = useState<boolean>(false);

    const onSetEmoji = async (desiredEmoji: string) => {
        try {
            const { emoji } = user.player;

            if (emoji === desiredEmoji) return;
            
            setIsSettingEmoji(true);

            const accessToken = await auth.currentUser?.getIdToken();
            
            const res = await axios.patch(`${config.serverUrl}/api/v1/user/setEmoji`, {
                userId: user._id,
                emoji: desiredEmoji
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Something wrong occured');

            setUser(res.data);
            setIsSettingEmoji(false);
        }
        catch (err: any) {
            setIsSettingEmoji(false);
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

    const addEmoji = async (emoji: string) => {
        try {
            const accessToken = await auth.currentUser?.getIdToken();

            const res = await axios.patch(`${config.serverUrl}/api/v1/user/addEmoji`, {
                userId: user._id,
                emoji
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
    
            if (res.status !== 200) return;
    
            let newUser: User = { ...user };
            if (newUser.player.emojiOwned.includes(emoji)) return;
            newUser.player.emojiOwned.push(emoji);
    
            setUser(newUser);
        }
        catch (err: any) {
            setIsSettingEmoji(false);
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

    const onSetNameColor = async (desiredNameColor: string) => {
        try {
            const { nameColor } = user.player;

            if (nameColor === desiredNameColor) return;
            
            setIsSettingNameColor(true);

            const accessToken = await auth.currentUser?.getIdToken();
            
            const res = await axios.patch(`${config.serverUrl}/api/v1/user/setNameColor`, {
                userId: user._id,
                nameColor: desiredNameColor
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Something wrong occured');

            setUser(res.data);
            setIsSettingNameColor(false);
        }
        catch (err: any) {
            setIsSettingNameColor(false);
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

    const addNameColor = async (nameColor: string) => {
        try {
            const accessToken = await auth.currentUser?.getIdToken();

            const res = await axios.patch(`${config.serverUrl}/api/v1/user/addNameColor`, {
                userId: user._id,
                nameColor
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
    
            if (res.status !== 200) return;
    
            let newUser: User = { ...user };
            if (newUser.player.nameColorOwned.includes(nameColor)) return;
            newUser.player.nameColorOwned.push(nameColor);
    
            setUser(newUser);
        }
        catch (err: any) {
            setIsSettingEmoji(false);
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
        isSettingEmoji,
        onSetEmoji,
        addEmoji,
        addNameColor,
        onSetNameColor,
        isSettingNameColor
    }
}