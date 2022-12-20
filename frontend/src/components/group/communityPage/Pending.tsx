import { Flex, Box, Text, HStack, Button } from '@chakra-ui/react'
import React from 'react'
import { TiWarning } from 'react-icons/ti'

const Pending = () => {
    return (
        <Flex direction="column"
            justify={"center"}
            align="center"
        >
            <Box
                p='4'
                shadow='xl'
                borderBottomRadius={{ base: 'md' }}
                bg='white'
                width={"100%"}
            >
                <Box>
                    <Flex alignItems="center" gap={1}>
                        <TiWarning />
                        <Text as="b" fontSize="sm">
                            Your request to join this community is pending.
                        </Text>
                    </Flex>
                    <Text fontSize="sm">
                        Please wait for the owner to accept your request.
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}

export default Pending