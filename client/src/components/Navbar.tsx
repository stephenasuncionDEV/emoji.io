import { default as NextLink } from 'next/link'
import { Text, Flex, VStack, HStack, Button, Image, 
    Divider, Input, InputGroup, InputLeftElement, Link, Box
} from '@chakra-ui/react'
import { FC } from 'react'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { AiTwotoneShop } from 'react-icons/ai'

const Navbar: FC = () => {
    return (
        <nav>
            <Flex w='full' p='1em' px='2em' justifyContent='space-between'>
                <Link href='/game' style={{ textDecoration: 'none' }}>
                    <HStack cursor='pointer'>
                        <Image src='./assets/images/logo.png' alt='emoji.io Logo' w='45px' />
                        <Text fontSize='14pt' textAlign='center'>
                            emoji.io
                        </Text>
                    </HStack>
                </Link>
                <HStack spacing='2em'>
                    <HStack>
                        <Button variant='primary' leftIcon={<CgProfile />}>
                            Profile
                        </Button>
                        <Button variant='primary' leftIcon={<AiTwotoneShop />}>
                            Shop
                        </Button>
                    </HStack>
                    <Button variant='danger' leftIcon={<CgLogOut />}>
                        Logout
                    </Button>
                </HStack>
            </Flex>
        </nav>
    )
}

export default Navbar