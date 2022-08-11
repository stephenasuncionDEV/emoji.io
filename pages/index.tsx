import type { NextPage } from 'next'
import { Text } from '@chakra-ui/react'
import Meta from '@/components/Meta'

const Home: NextPage = () => {
    return (
        <div>
            <Meta title='index' />
            <Text>
                index
            </Text>
        </div>
    )
}

export default Home
