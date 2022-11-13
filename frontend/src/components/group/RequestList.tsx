import { Avatar, Flex, HStack, Box, Text, Button, } from '@chakra-ui/react'
import React, { FC } from 'react'

const RequestList: FC<{ userProfile: string; userRole?: string; userName: string }> = ({ userProfile, userName, userRole }) => {
    return (

        <Box borderRadius="md" backgroundColor="white" minWidth={"265px"} maxWidth={"700px"} width="100%">
            <Box p={2} borderRadius="md">
                <Flex direction={{ base: "column", sm: "row", md: "row" }} gap={2} justify={"space-between"} mr={2} ml={2}>
                    <HStack gap={2}>
                        <Avatar boxSize="55px" src={userProfile} name={userName} />
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>

                                <Text as="b" fontSize="sm">
                                    {userName}
                                </Text>
                            </Box>
                            <Text fontSize="sm">{userRole}</Text>
                        </div>
                    </HStack>
                    <HStack justify={{ base: "flex-end" }}>
                        <Button background={'green'} color={'white'} size={"sm"}>
                            Accept
                        </Button>
                        <Button background={'red'} color={'white'} size={"sm"}>
                            Decline
                        </Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    )
}

export default RequestList