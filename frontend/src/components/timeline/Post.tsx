import { Avatar, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { AiFillLike } from "react-icons/ai"
import AppBody from "../share/app/AppBody"
import Feed from "./Feed"

export type PostProps = {
    id: string
    name: string
    dateTime: string
    message: string
    likes: number
    comment: number
    share: number
    avatar: string
    media: string
    score: number
}
export const Post = (props: PostProps) => {
    return (
        <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" fontWeight="semibold">
            <Text align="right"> score: {props.score} </Text>
            <HStack>
                <Avatar size="md" name={props.name} src={props.avatar} />
                <VStack spacing="0.5" align={"-moz-initial"}>
                    <Text align="left">{props.name}</Text>
                    <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                        {props.dateTime}
                    </Text>
                </VStack>
            </HStack>
            <Container p="1" fontWeight="normal">
                {props.message}
                <Image src={props.media} alt="" p="1" fit={"cover"} />
            </Container>
            <HStack spacing="0.5">
                <Icon as={AiFillLike} color="#E65300"></Icon>
                <Text p="1" fontSize="xs">
                    {props.likes} {props.comment} {props.share}
                </Text>
            </HStack>
        </Box>
    )
}

// export function GetLikes() {
//     return {props.likes}
// }

// export function GetComments(props: PostProps) {
//     return 0
// }

// export function GetShares(props: PostProps) {
//     return 0
// }

export default Post
