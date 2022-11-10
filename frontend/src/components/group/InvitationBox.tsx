import { Flex, HStack, Box, Image, Text, Button, Stack, VStack } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"

const InvitationBox: FC<{
    userName: string
    communityName: string
    memberNumber: number
    coverPhoto: string
    isPrivate: boolean
    expireDate: string
}> = ({
    communityName,
    memberNumber,
    coverPhoto,
    isPrivate,
    userName, //name of the person who invited
    expireDate,
}) => {
    return (
        <Box borderRadius="md" backgroundColor="gray.300" mt={2}>
            <Box p={3} borderRadius="md">
                <Flex direction={{ base: "column-reverse", sm: "column-reverse", lg: "column" }}>
                    <Flex direction={{ base: "column", sm: "column", lg: "row" }} gap={2} justify="space-between">
                        <HStack>
                            <Image ml={1} borderRadius="md" boxSize="55px" src={coverPhoto} alt="Cover Photo" />
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    {isPrivate ? <MdPublicOff /> : <MdPublic />}
                                    <Text as="b" fontSize="sm">
                                        {communityName}
                                    </Text>
                                </Box>
                                <Text fontSize="sm">
                                    {memberNumber} {memberNumber == 1 ? "Member" : "Members"}
                                </Text>
                            </div>
                        </HStack>
                        <HStack justify={{ base: "flex-start", md: "flex-end" }}>
                            <Button size="sm">Join community</Button>
                            <Button size="sm">Decline invite</Button>
                        </HStack>
                    </Flex>
                    <Box m={1}>
                        <Text fontSize="sm" as="b">
                            {userName} invited you to join this community
                        </Text>
                        <Text fontSize="sm">invite expires in {expireDate} days</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default InvitationBox
