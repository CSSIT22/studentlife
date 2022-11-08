import { HStack, Box, Image, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const CommunityList: FC<{ communityName: string; active: string; image: string }> = ({ communityName, active, image }) => {
    return (
        <Box borderRadius="md" backgroundColor="gray.300" mt={2}>
            <Box p={2} borderRadius="md">
                <HStack gap={2}>
                    <Image ml={1} borderRadius="md" boxSize="55px" src={image} alt="Cover Photo" />
                    <div>
                        <Text as="b" fontSize="sm">
                            {communityName}
                        </Text>
                        <Text fontSize="sm">Last active {active} days ago</Text>
                    </div>
                </HStack>
            </Box>
        </Box>
    )
}

export default CommunityList
