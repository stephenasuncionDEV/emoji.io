import { SignedInUser } from '@/interfaces/globals'
import { User } from '@/types/globals'
import { initializeApp } from 'firebase/app'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, AuthProvider } from 'firebase/auth'
import axios from 'axios'
import config from '@/config/index'
import { useState } from 'react'

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_SENDER_ID,
    appId: process.env.FB_APP_ID
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export type SignInProvider = 'google' | 'github'

export const useAuth = () => {
    const toast = useToast();
    const { setUser } = useUser();
    const [nickname, setNickname] = useState<string>('');

    const SignIn = async (provider: SignInProvider) => {
        try {
            const authProvider: AuthProvider = {
                google: googleProvider,
                github: githubProvider
            }[provider];

            const userCredentials = await signInWithPopup(auth, authProvider);
            const accessToken = await userCredentials.user.getIdToken();
            const { displayName, email, uid } = userCredentials.user.toJSON() as SignedInUser;

            const res = await axios.post(`${config.serverUrl}/api/v1/user/login`, {
                firebase_uid: uid,
                email,
                name: displayName
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
            
            setUser(res.data);
        }
        catch (err: any) {
            console.error(err);
            let msg = 'Error';
            if (err.response) msg = err.response.data.message
            else if (err.request)  msg = err.request.message
            else msg = err.message
            toast({
                title: 'Error',
                description: msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const Logout = async () => {
        try {
            await signOut(auth);
        }
        catch (e) {
            console.error(e)
        }
    }

    const SignInAsGuest = async () => {
        try {
            if (!nickname.length) throw new Error('You must enter a nickname');

            const newUser: User = {
                _id: 'guest',
                email: 'guest',
                firebase_uid: 'guest',
                name: nickname,
                player: {
                    emoji: '🐀',
                    emojiOwned: [],
                    nameColor: 'black',
                    size: 36
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            setUser(newUser);
        }
        catch (err: any) {
            console.error(err)
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    return {
        SignIn,
        SignInAsGuest,
        Logout,
        nickname,
        setNickname
    }
}