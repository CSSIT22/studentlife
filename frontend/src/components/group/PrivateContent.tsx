import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiWarning } from 'react-icons/ti'

const PrivateContent: FC<{
    communityPrivacy: boolean
    communityId: string
    isMember: boolean
}> = ({
    communityPrivacy,
    communityId,
    isMember,
}) => {
        return (
            <Flex direction="column" justify={"center"} align="center" mt={3}>
                {communityPrivacy && communityId != "" && !isMember ? (
                    <Box borderRadius="md" backgroundColor="red.200" maxWidth={"700px"} width={"100%"}>
                        <HStack gap={2} p={2}>
                            <Box height={"55px"}></Box>
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <TiWarning />
                                    <Text as="b" fontSize="sm">
                                        This Community is Private :(
                                    </Text>
                                </Box>
                                <Text fontSize="sm">Join this Community to view or participate in discussions.</Text>
                            </div>
                        </HStack>
                    </Box>
                ) : (
                    ""
                )}
            </Flex>)

    }

export default PrivateContent