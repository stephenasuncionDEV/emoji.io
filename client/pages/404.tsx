import type { NextPage } from 'next'
import { Text } from '@chakra-ui/react'
import Meta from '@/components/Meta'

const NotFound: NextPage = () => {
    return (
        <div>
            <Meta title='404' />
            <Text>
                Not Found
            </Text>
        </div>
    )
}

export default NotFound
