import { Avatar, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai"
import API from "src/function/API"
import AppBody from "../share/app/AppBody"
import Feed from "./Feed"
import { Postdata } from "./Postdata"

// export type PostProps = { // <= Previous way to get Post properties
//     id: string
//     name: string
//     dateTime: string
//     message: string
//     likes: number
//     comments: number
//     shares: number
//     avatar: string
//     media: string
//     score?: number
// }
function ScoreUp(likes: number, comments: number, shares: number) {
    comments *= 4 // 1 comment = 4 scores
    shares *= 2 // 1 shares = 2 scores
    return likes + comments + shares
}

export const Post = (/*props: PostProps*/) => {
    let sortedScore = Postdata.sort((a, b) => (a.score > b.score ? -1 : 1))

    const renderPost = sortedScore.map((item) =>
        <VStack p="1"> // if we're not using VStack & p="3" here, our posts will have no padding between each of them.. โพสต์ติดกันไม่มีช่องว่าง
            <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="hidden" fontWeight="semibold">
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
        </VStack>
    )

    return (
        <div className="mainBox">
            {renderPost}
        </div>
    )
}

export default Post
