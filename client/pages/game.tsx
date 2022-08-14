import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useGameCore } from '@/hooks/useGameCore'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'
import AutoSizer from '../src/components/AutoSizer'

const Game: NextPage = () => {
    const { canvasRef } = useGameCore();
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