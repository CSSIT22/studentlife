import { Box, HStack, VStack, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Avatar, Icon, Input } from "@chakra-ui/react"
import { FaVideo, FaRegImages, FaRegGrinSquint } from "react-icons/fa"
import React from "react"

const CreatingPost = ({ photoUrl }: { photoUrl: string }) => {
    return (
        <Box p="3" minW="sm" maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden" fontWeight="semibold">
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing="4" align="stretch">
                <HStack>
                    <Avatar size="md" src={photoUrl} />
                    <Input placeholder="What's on your mind" size="md" variant="filled" />
                </HStack>
                <HStack spacing={4}>
                    <Icon as={FaVideo} color="#EE3E1B"></Icon>
                    <Text p="1" fontSize="s">
                        Video
                    </Text>
                    <Icon as={FaRegImages} color="#3DEE23"></Icon>
                    <Text p="1" fontSize="s">
                        Photo
                    </Text>
                    <Icon as={FaRegGrinSquint} color="#F9DB62"></Icon>
                    <Text p="1" fontSize="s">
                        Feeling/Activity
                    </Text>
                </HStack>
            </VStack>
        </Box>
    )
}

export default CreatingPost
