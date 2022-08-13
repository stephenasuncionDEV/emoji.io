import type { NextPage } from 'next'
import { default as NextLink } from 'next/link'
import { Text, Flex, VStack, HStack, Button, Image, 
    Divider, Input, InputGroup, InputLeftElement, Link
} from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useAuth } from '@/hooks/useAuth'
import Meta from '@/components/Meta'

const Game: NextPage = () => {
    useReAuthenticate({ protect: true });
    const { Logout } = useAuth();

    return (
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <Meta title='Game | emoji.io' />
            <Flex flexDir='column'>
                <Text>
                    Game
                </Text>
                <Button onClick={Logout} variant='primary'>
                    Logout
                </Button>
            </Flex>
        </main>
    )
}

export default Game