import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@/providers/UserProvider'
import { GameProvider } from '@/providers/GameProvider'
import theme from '@/utils/theme'
import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider>
                <GameProvider>
                    <Component {...pageProps} />
                </GameProvider>
            </UserProvider>
        </ChakraProvider>
    )
}

export default MyApp
