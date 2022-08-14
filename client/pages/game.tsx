import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import { useGame } from '@/providers/GameProvider'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'
import AutoSizer from '@/components/Autosizer'

const Game: NextPage = () => {
    const { canvasRef } = useGame();
    useReAuthenticate({ protect: true });

    return (
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Meta title='Game | emoji.io' />
            <Navbar />
            <Flex flexDir='column' flex='1'>
                <AutoSizer>
                    {({ width, height }) => (
                        <canvas
                            id='game-display'
                            ref={canvasRef}
                            width={width}
                            height={height}
                        />
                    )}
                </AutoSizer>
            </Flex>
        </main>
    )
}

export default Game