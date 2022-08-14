import type { NextPage } from 'next'
import { default as NextLink } from 'next/link'
import { Text, Flex, VStack, HStack, Button, Image, 
    Divider, Input, InputGroup, InputLeftElement, Link
} from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useAuth } from '@/hooks/useAuth'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'

const Game: NextPage = () => {
    useReAuthenticate({ protect: true });
    const { Logout } = useAuth();

    return (
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Meta title='Game | emoji.io' />
            <Navbar />
            <Flex flexDir='column'>
                
            </Flex>
        </main>
    )
}

export default Game