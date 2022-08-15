import { useState, useEffect, Dispatch } from 'react'
import { auth } from '@/hooks/useAuth'
import { User } from '@/types/globals'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import axios from 'axios'

export interface ProfileModal {
    user: User
    setUser: Dispatch<User>
}

export const useProfile = ({ user, setUser }: ProfileModal) => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emoji, setEmoji] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        setName(user.name);
        setEmail(user.email);
        setEmoji(user.player?.emoji);
    }, [user])

    const onSave = async () => {
        try {
            if (name === user.name) return;

            setIsSaving(true);

            const accessToken = await auth.currentUser?.getIdToken();

            const res = await axios.patch(`${config.serverUrl}/api/v1/user/setName`, {
                userId: user._id,
                name
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            let newUser: User = { ...user };
            newUser.name = name;

            setUser(newUser);
            setIsSaving(false);

            toast({
                title: 'Success',
                description: 'Successfully Saved User Profile',
                status: 'success'
            })
        }
        catch (err: any) {
            setIsSaving(false);
            console.error(err);
            let msg = 'Error';
            if (err.response) msg = err.response.data.message
            else if (err.request)  msg = err.request.data.message
            else msg = err.message
            toast({
                description: msg
            })
        }
    }

    return {
        onSave,
        name,
        setName,
        email,
        setEmail,
        emoji,
        setEmoji,
        isSaving,
        setIsSaving
    }
}