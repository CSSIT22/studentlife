import { Box, Flex, HStack, Spinner, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiWarning } from 'react-icons/ti'

const Pending: FC<{
    // isBlacklisted: boolean,
}> = ({
    // isBlacklisted,
}) => {
        return (
            <Flex direction="column"
                justify={"center"}
                align="center"
            >
                <Box
                    shadow='lg'
                    borderRadius='md'
                    backgroundColor="white"
                    width={"100%"}
                >
                    <HStack gap={2} py='2'>
                        <Box height={"55px"}></Box>
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Spinner
                                    thickness='3px'
                                    speed='0.65s'
                                    emptyColor='orange.100'
                                    color='orange.500'
                                    size='sm'
                                />
                                <Text as="b" fontSize="sm">
                                    Your request is pending.
                                </Text>
                            </Box>
                            <Text fontSize="sm">
                                Waiting for the owner or admin to approve your request.
                            </Text>
                        </div>
                    </HStack>
                </Box>
            </Flex>
        )
    }

export default Pending