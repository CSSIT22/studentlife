import { Avatar, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai"
import AppBody from "../share/app/AppBody"
import Feed from "./Feed"
import { Postdata } from "./Postdata"

export type PostProps = {
    id: string
    name: string
    dateTime: string
    message: string
    likes: number
    comments: number
    shares: number
    avatar: string
    media: string
    score?: number
}
export const Post = (props: PostProps) => {
    function ScoreUp(likes: number, comments: number, shares: number) {
        comments *= 4 // 1 comment = 4 scores
        shares *= 2 // 1 shares = 2 scores
        return likes + comments + shares
    }
    let sortedScore = Postdata.sort((a, b) => (a.score > b.score ? -1 : 1))

    const renderPost = sortedScore.map((item) =>
        <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" fontWeight="semibold">
            <Text align="right"> score: {item.score} </Text>
            <HStack>
                <Avatar size="md" name={item.name} src={item.avatar} />
                <VStack spacing="0.5" align={"-moz-initial"}>
                    <Text align="left">{item.name}</Text>
                    <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                        {item.dateTime}
                    </Text>
                </VStack>
            </HStack>
            <Container p="1" fontWeight="normal">
                {item.message}
                <Image src={item.media} alt="" p="1" fit={"cover"} />
            </Container>
            <HStack spacing="0.5">
                <Icon as={AiFillLike} color="#E65300"></Icon>
                <Text p="1" fontSize="xs">
                    {item.likes} {item.comments} {item.shares}
                </Text>
                <Icon as={AiOutlineShareAlt}></Icon>
            </HStack>
        </Box>
    )

    return (
        <div className="mainBox">
            {renderPost}
        </div>


    )


}

// export function GetLikes() {
//     return props.likes
// }

// export function GetComments(props: PostProps) {
//     return {props.comments}
// }

// export function GetShares(props: PostProps) {
//     return 0
// }

export default Post
