import { Text, Flex, HStack, Button, Image, Link, TagLabel, Tag,
    TagLeftIcon, useColorModeValue, useColorMode, IconButton
} from '@chakra-ui/react'
import { FC } from 'react'
import { useUser } from '@/providers/UserProvider'
import { useAuth } from '@/hooks/useAuth'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { AiTwotoneShop, AiOutlineWarning } from 'react-icons/ai'
import { MdOutlineChat, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

export interface NavbarProps {
    onProfileOpen?: () => void;
    onShopOpen?: () => void;
    onChatOpen?: () => void;
}

const Navbar: FC<NavbarProps> = ({ onProfileOpen, onShopOpen, onChatOpen }) => {
    const { Logout } = useAuth();
    const { isGuest } = useUser();
    const { colorMode, toggleColorMode } = useColorMode();

    const tagBgColor = useColorModeValue('gray.200', 'white.200');
    const colorModeColor = useColorModeValue('blackAlpha.500', 'yellow');

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
                    {isGuest && (
                        <Tag bg={tagBgColor}>
                            <TagLeftIcon>
                                <AiOutlineWarning fontSize='18pt' />
                            </TagLeftIcon>
                            <TagLabel>You are logged in as guest</TagLabel>
                        </Tag>
                    )}
                    <HStack>
                        <Button variant='primary' leftIcon={<CgProfile />} onClick={onProfileOpen}>
                            Profile
                        </Button>
                        <Button variant='primary' leftIcon={<AiTwotoneShop />} onClick={onShopOpen}>
                            Shop
                        </Button>
                        <Button variant='primary' leftIcon={<MdOutlineChat />} onClick={onChatOpen}>
                            Chat
                        </Button>
                        <IconButton 
                            aria-label='Toggle Color Mode' 
                            onClick={toggleColorMode} 
                            _hover={{ 
                                color: colorModeColor, 
                                bg: 'transparent' 
                            }} 
                            bg='transparent'
                        >
                            {colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                        </IconButton>
                    </HStack>
                    <Button variant='danger' leftIcon={<CgLogOut />} onClick={Logout}>
                        Logout
                    </Button>
                </HStack>
            </Flex>
        </nav>
    )
}

export default Navbar