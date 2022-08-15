import type { NextPage } from 'next'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useGameCore } from '@/hooks/useGameCore'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'
import Filler from '@/components/Filler'
import ProfileModal from '@/components/ProfileModal'

const Game: NextPage = () => {
    const { canvasRef } = useGameCore();
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    useReAuthenticate({ protect: true });

    return (
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Meta title='Game | emoji.io' />
            <ProfileModal 
                isProfileOpen={isProfileOpen}
                onProfileClose={onProfileClose}
            />
            <Navbar 
                onProfileOpen={onProfileOpen}
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