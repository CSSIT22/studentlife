import { Avatar, Flex, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai"
import API from "src/function/API"
import AppBody from "../share/app/AppBody"
import Feed from "./Feed"
import { Postdata } from "./Postdata"
import EmojiReaction from "../blog/EmojiReaction"
import CommentButton from "../blog/CommentButton"
import RemodButton from "../blog/RemodButton"
import Optionbutton from "../blog/Optionbutton"
import EmojiFeelingTelling from "../blog/EmojiFeelingTelling"
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
        <VStack p="3"> // if we're not using VStack & p="3" here, our posts will have no padding between each of them.. โพสต์ติดกันไม่มีช่องว่าง
            <Box width={"100%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                <Text align="right"> score: {item.score} </Text>
                <Flex justifyContent="flex-end" marginTop={"10px"}><Optionbutton /></Flex>
                <HStack marginTop={"-60px"}>
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
                <Center>
                    <Box marginTop={"6"} display="flex" gap={10}>
                        <Box>
                            <EmojiReaction />
                        </Box>
                        <Box>
                            <EmojiFeelingTelling number={item.likes} emotion=" LIKES" />
                        </Box>
                        <Box>
                            <CommentButton />
                        </Box>
                        <Box>
                            <RemodButton />
                        </Box>
                    </Box>
                </Center>
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
