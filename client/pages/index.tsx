import type { NextPage } from 'next'
import { default as NextLink } from 'next/link'
import { Center, Text, Flex, VStack, HStack, Button, Image, Divider } from '@chakra-ui/react'
import Meta from '@/components/Meta'
// import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/hooks/useAuth'

const Home: NextPage = () => {
    // const [user, loading, error] = useAuthState(auth);

    //console.log(user)

    return (
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <Meta title='emoji.io' />
            <Center flex='1'>
                <Flex flexDir='column' alignItems='center'>
                    <Image src='./assets/images/logo.png' alt='emoji.io Logo' w='150px' />
                    <Text fontSize='32pt' textAlign='center'>
                        emoji.io
                    </Text>
                    <NextLink href='/login' shallow passHref>
                        <Button mt='1em' variant='primary'>
                            Play 🚀
                        </Button>
                    </NextLink>
                    <HStack mt='1em'>
                        <NextLink href='/' shallow passHref>
                            <Text opacity='.5' fontSize='10pt' cursor='pointer' _hover={{ textDecoration: 'underline', opacity: '1' }}>
                                Terms of Service
                            </Text>
                        </NextLink>
                        <Divider opacity='.5' orientation='vertical' borderLeft='1px solid rgb(150,150,150)' h='15px' />
                        <NextLink href='/' shallow passHref>
                            <Text opacity='.5' fontSize='10pt' cursor='pointer' _hover={{ textDecoration: 'underline', opacity: '1' }}>
                                Privacy
                            </Text>
                        </NextLink>
                    </HStack>
                </Flex>
            </Center>
        </main>
    )
}

export default Home
