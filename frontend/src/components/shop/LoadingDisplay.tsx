import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import ShopAppBody from './ShopAppBody'

const LoadingDisplay = () => {
    return (
        <ShopAppBody>
            <Flex justify="center" align="center" w="full" h="full">
                <Spinner size="xl" />
            </Flex>
        </ShopAppBody>
    )
}

export default LoadingDisplay