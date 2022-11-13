import { HStack, Box, Image, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"
import { Link } from "react-router-dom"

const CommunityList: FC<{ communityID: number; communityName: string; lastActive: string; coverPhoto: string; isPrivate: boolean; roleID: number }> = ({
    communityName,
    lastActive,
    coverPhoto,
    isPrivate,
    roleID,
    communityID

}) => {
    return (
        <Link to={`/groups/id/${communityID}`}>
            <Box _hover={{ backgroundColor: "gray.100", cursor: "pointer" }} borderRadius="md" backgroundColor="white" boxShadow={'2xl'} mt={2} color='black'>
                <Box p={2} borderRadius="md">
                    <HStack gap={2}>
                        <Image ml={1} borderRadius="md" boxSize="55px" src={coverPhoto} alt="Cover Photo" />
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                {isPrivate ? <MdPublicOff /> : <MdPublic />}
                                <Text as="b" fontSize="sm">
                                    {communityName}
                                </Text>
                            </Box>
                            <Text fontSize="sm">Last active {lastActive} days ago</Text>
                        </div>
                    </HStack>
                </Box>
            </Box>
        </Link>
    )
}

export default CommunityList
