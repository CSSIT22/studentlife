import { HStack, Box, Image, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"

const CommunityList: FC<{ communityName: string; active: string; image: string; privacy: boolean }> = ({ communityName, active, image, privacy }) => {
    return (
        <Box _hover={{ backgroundColor: "gray.400", cursor: "pointer" }} borderRadius="md" backgroundColor="gray.300" mt={2}>
            <Box p={2} borderRadius="md">
                <HStack gap={2}>
                    <Image ml={1} borderRadius="md" boxSize="55px" src={image} alt="Cover Photo" />
                    <div>
                        <Box display="flex" alignItems="center" gap={1}>
                            {privacy ? <MdPublic /> : <MdPublicOff />}
                            <Text as="b" fontSize="sm">
                                {communityName}
                            </Text>
                        </Box>
                        <Text fontSize="sm">Last active {active} days ago</Text>
                    </div>
                </HStack>
            </Box>
        </Box>
    )
}

export default CommunityList
