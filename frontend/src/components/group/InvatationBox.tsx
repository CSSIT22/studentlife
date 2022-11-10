import { HStack, Box, Image, Text, Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"

const CommunityList: FC<{
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
                <HStack gap={2} justify="space-between">
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
                    <HStack>
                        <Button size="sm">Join community</Button>
                        <Button size="sm">Decline invite</Button>
                    </HStack>
                </HStack>
                <Text ml={1} fontSize="sm" as="b">
                    {userName} invited you to join this community
                </Text>
                <Text ml={1} fontSize="sm">
                    invite expires in {expireDate} days
                </Text>
            </Box>
        </Box>
    )
}

export default CommunityList
