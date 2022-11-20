import { Avatar, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { AiFillLike } from "react-icons/ai"

const Post = ({
    name,
    dateTime,
    message,
    likes,
    avatar,
    media,
    score,
}: {
    name: string
    dateTime: string
    message: string
    likes: number
    avatar: string
    media: string
    score: number
}) => {
    return (
        <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" fontWeight="semibold">
            <Text align="right"> score: {score} </Text>
            <HStack>
                <Avatar size="md" name={name} src={avatar} />
                <VStack spacing="0.5" align={"-moz-initial"}>
                    <Text align="left">{name}</Text>
                    <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                        {dateTime}
                    </Text>
                </VStack>
            </HStack>
            <Container p="1" fontWeight="normal">
                {message}
                <Image src={media} alt="" p="1" fit={"cover"} />
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
