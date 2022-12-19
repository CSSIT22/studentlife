import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiWarning } from 'react-icons/ti'

const Private: FC<{


}> = ({


}) => {
        return (
            <Flex direction="column"
                justify={"center"}
                align="center"
            // mt={1}
            >
                <Box
                    shadow='lg'
                    // borderRadius={{ base: "none", md: 'md' }}
                    // borderBottomRadius={{ base: 'md' }}
                    borderRadius='md'
                    // backgroundColor="red.200"
                    bg='white'
                    // maxWidth={"700px"}
                    width={"100%"}
                >
                    <HStack gap={2} py='2' >
                        <Box height={"55px"}></Box>
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                <TiWarning />
                                <Text as="b" fontSize="sm" >
                                    This community is private.
                                </Text>
                            </Box>
                            <Text fontSize="sm">
                                Join this community to view and participate in discussions.
                            </Text>
                        </div>
                    </HStack>
                </Box>
            </Flex>)

    }

export default Private