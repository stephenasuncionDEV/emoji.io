import type { NextPage } from 'next'
import Link from 'next/link'
import { Center, Text, Flex, VStack, HStack, Button, Image, Divider } from '@chakra-ui/react'
import Meta from '@/components/Meta'

const Home: NextPage = () => {

    return (
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <Meta title='emoji.io' />
            <Center flex='1'>
                <Flex flexDir='column' alignItems='center'>
                    <Image src='./assets/images/logo.png' alt='emoji.io Logo' w='150px' />
                    <Text fontSize='32pt' textAlign='center'>
                        emoji.io
                    </Text>
                    <Button mt='1em' variant='primary'>
                        Play 🚀
                    </Button>
                    <HStack mt='1em'>
                        <Link href='/' shallow passHref>
                            <Text opacity='.5' fontSize='10pt' cursor='pointer' _hover={{ textDecoration: 'underline', opacity: '1' }}>
                                Terms of Service
                            </Text>
                        </Link>
                        <Divider opacity='.5' orientation='vertical' borderLeft='1px solid rgb(150,150,150)' h='15px' />
                        <Link href='/' shallow passHref>
                            <Text opacity='.5' fontSize='10pt' cursor='pointer' _hover={{ textDecoration: 'underline', opacity: '1' }}>
                                Privacy
                            </Text>
                        </Link>
                    </HStack>
                </Flex>
            </Center>
        </main>
    )
}

export default Home
