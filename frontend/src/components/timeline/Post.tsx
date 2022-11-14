import { Avatar, Box, Center, Container, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { AiFillLike } from "react-icons/ai"

const Post = ({ name, dateTime, message, likes, photoUrl }: { name: string; dateTime: string; message: string; likes: string; photoUrl: string }) => {
    return (
        <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" fontWeight="semibold">
            <HStack>
                <Avatar size="md" name={name} src={photoUrl} />
                <VStack spacing="0.5" align={"-moz-initial"}>
                    <Text align="left">{name}</Text>
                    <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                        {dateTime}
                    </Text>
                </VStack>
            </HStack>
            <Container p="1" fontWeight="normal">
                {message}
            </Container>
            <HStack spacing="0.5">
                <Icon as={AiFillLike} color="#E65300"></Icon>
                <Text p="1" fontSize="xs">
                    {likes}
                </Text>
            </HStack>
        </Box>
    )
}

export default Post
