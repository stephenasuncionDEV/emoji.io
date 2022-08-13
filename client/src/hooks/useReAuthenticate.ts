import { SignedInUser } from '@/interfaces/globals'
import { User } from '@/types/globals'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useUser } from '@/providers/UserProvider'
import { auth } from '@/hooks/useAuth'
import axios from 'axios'
import config from '@/config/index'

export interface ReAuthenticateProps {
    protect: boolean
}

export const useReAuthenticate = ({ protect }: ReAuthenticateProps) => {
    const router = useRouter();
    const { setUser: setUserMain } = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!auth) return;
        setLoading(true);
        const reAuthenticate = onAuthStateChanged(auth, async (user) => {
            try {
                if (!user) {
                    if (protect) router.push('/', undefined, { shallow: true });
                    return;
                }

                if (!protect) {
                    router.push('/game', undefined, { shallow: true });
                    return;
                }

                const { email } = user.toJSON() as SignedInUser;
                const accessToken = await user.getIdToken();

                if (!accessToken) return;

                const res = await axios.get(`${config.serverUrl}/api/v1/user/getByEmail`, {
                    params: {
                        email
                    },
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                })
    
                setUserMain(res.data);
                setUser(res.data);
                setLoading(false);
            }
            catch (err: any) {
                console.error(err);
                setLoading(false);
            }
        })   
        return () => reAuthenticate();
    }, [auth])

    return [user, loading]
}