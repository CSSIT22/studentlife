import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiWarning } from 'react-icons/ti'

const PrivateContent: FC<{
    isBlacklisted: boolean,
}> = ({
    isBlacklisted,
}) => {
        return (
            <Flex direction="column" justify={"center"} align="center" mt={3}>
                {isBlacklisted ? (
                    <Box borderRadius="md" backgroundColor="red.200" maxWidth={"700px"} width={"100%"}>
                        <HStack gap={2} p={2}>
                            <Box height={"55px"}></Box>
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <TiWarning />
                                    <Text as="b" fontSize="sm">
                                        You are banned from this Community :(
                                    </Text>
                                </Box>
                                <Text fontSize="sm">
                                    You can no longer view or participate in discussions.
                                </Text>
                            </div>
                        </HStack>
                    </Box>
                ) : (
                    ""
                )}
            </Flex>)

    }

export default PrivateContent