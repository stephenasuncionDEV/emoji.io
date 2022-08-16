import type { NextPage } from 'next'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useGameCore } from '@/hooks/useGameCore'
import { useChat } from '@/hooks/useChat'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'
import Filler from '@/components/Filler'
import ProfileModal from '@/components/ProfileModal'
import ShopModal from '@/components/ShopModal'
import ChatModal from '@/components/ChatModal'
import { DisconnectedModal } from '@/components/DisconnectedModal'
import { io } from 'socket.io-client'
import config from '@/config/index'

export const socket = io(config.socketUrl as string, { reconnection: false });

const Game: NextPage = () => {
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    const { isOpen: isShopOpen, onOpen: onShopOpen, onClose: onShopClose } = useDisclosure();
    const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();
    const { isOpen: isDCModalOpen, onOpen: onDCModalOpen, onClose: onDCModalClose } = useDisclosure();
    const { ...chatProps } = useChat({ socket });
    const { canvasRef } = useGameCore({ 
        socket,
        isChatOpen,
        onDCModalOpen, 
        onChatOpen,
        onChatClose
    });
    useReAuthenticate({ protect: true });

    return (
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Meta title='Game | emoji.io' />
            <ProfileModal 
                isProfileOpen={isProfileOpen}
                onProfileClose={onProfileClose}
            />
            <ShopModal
                isShopOpen={isShopOpen}
                onShopClose={onShopClose}
            />
            <ChatModal 
                {...chatProps}
                isChatOpen={isChatOpen}
                onChatClose={onChatClose}
            />
            <DisconnectedModal 
                isDCModalOpen={isDCModalOpen}
                onDCModalClose={onDCModalClose}
            />
            <Navbar 
                onProfileOpen={onProfileOpen}
                onShopOpen={onShopOpen}
                onChatOpen={onChatOpen}
            />
            <Flex flexDir='column' flex='1'>
                <Filler>
                    {({ width, height }) => (
                        <canvas
                            id='game-display'
                            ref={canvasRef}
                            width={width}
                            height={height}
                        />
                    )}
                </Filler>
            </Flex>
        </main>
    )
}

export default Game