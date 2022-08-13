import { SignedInUser } from '@/interfaces/globals'
import { initializeApp } from 'firebase/app'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, AuthProvider } from 'firebase/auth'
import axios from 'axios'
import config from '@/config/index'

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

export const useFirebase = () => {
    const toast = useToast();
    const { setUser } = useUser();

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

            //User
            setUser(res.data);
        }
        catch (e: any) {
            console.error(e);
            let msg = 'Error';
            if (e.response) msg = e.response.data.message
            else if (e.request)  msg = e.request.message
            else msg = e.message
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

    return {
        SignIn,
        Logout
    }
}