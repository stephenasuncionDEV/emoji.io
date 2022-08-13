import type { NextPage } from 'next'
import { default as NextLink } from 'next/link'
import { Text, Flex, VStack, HStack, Button, Image, 
    Divider, Input, InputGroup, InputLeftElement, Link
} from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useAuth } from '@/hooks/useAuth'
import Meta from '@/components/Meta'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { CgRename } from 'react-icons/cg'

const Login: NextPage = () => {
    const { SignIn, SignInAsGuest, nickname, setNickname } = useAuth();
    useReAuthenticate({ protect: false });
    
    return (
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <Meta title='Login | emoji.io' />
            <Flex flex='1'>
                <Flex flexDir='column' maxW='385px' flex='1' p='2em'>
                    <NextLink href='/' shallow passHref>
                        <HStack cursor='pointer'>
                            <Image src='./assets/images/logo.png' alt='emoji.io Logo' w='50px' />
                            <Text fontSize='24pt' textAlign='center'>
                                emoji.io
                            </Text>
                        </HStack>
                    </NextLink>
                    <Text fontSize='24pt' mt='1em'>
                        Login
                    </Text>
                    <VStack mt='.5em'>
                        <Button variant='login' leftIcon={<FcGoogle />} w='full' onClick={() => SignIn('google')}>
                            Google
                        </Button>
                        <Button variant='login' leftIcon={<FaGithub />} w='full' onClick={() => SignIn('github')}>
                            GitHub
                        </Button>
                    </VStack>
                    <HStack mt='1em' opacity='.5'>
                        <Divider orientation='horizontal' borderBottom='1px solid rgb(150,150,150)' />
                            <Text fontSize='10pt'>
                                or
                            </Text>
                        <Divider orientation='horizontal' borderBottom='1px solid rgb(150,150,150)' />
                    </HStack>
                    <InputGroup mt='.5em'>
                        <InputLeftElement pointerEvents='none'>
                            <CgRename color='gray.300' />
                        </InputLeftElement>
                        <Input type='text' bg='white' placeholder='Nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    </InputGroup>
                    <HStack mt='2em' justifyContent='space-between'>
                        <Button variant='primary' size='sm' onClick={SignInAsGuest}>
                            Next
                        </Button>
                        <Link href='mailto:stephenasuncion@outlook.com' fontSize='10pt' color='gray.400'>
                            Need Help ?
                        </Link>
                    </HStack>
                </Flex>
                <Flex flexDir='column' flex='1' bg='gray.600'>
                </Flex>
            </Flex>
        </main>
    )
}

export default Login
