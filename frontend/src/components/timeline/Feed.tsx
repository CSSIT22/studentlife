import { Avatar, Box, Button, Heading, HStack, Image, VStack, Text, Container, Icon, StackDivider, Input, SimpleGrid, Center } from "@chakra-ui/react"
import { Any } from "@react-spring/types"
import React, { useEffect, useState } from "react"
import API from "src/function/API"
import CreatingPost from "./CreatingPost"
import FriendSuggestion from "./FriendSuggestion"
import Post from "./Post"
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai"
import { FaVideo, FaRegImages, FaRegGrinSquint } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import SuggestedFriend from "./SuggestedFriend"
import { Postdata } from "./Postdata"
import CreateButton from "./CreateButton"

export const Feed = () => {
    const [posts, setposts] = useState<any>([])
    const getData = API.get("/timeline/getposts")
    useEffect(() => {
        getData.then(res => {
            setposts(res.data)
        })
    }, [])

    return (
        <VStack>
            {/* {posts.map((item: any) => (
                <>
                    <CreatingPost photoUrl={item.avatar}></CreatingPost>
                    <FriendSuggestion></FriendSuggestion>
                    <Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="hidden" fontWeight="semibold">
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
                    <Heading key={item.id}>{item.name}</Heading>
                </>
            ))} */}

            <CreatingPost photoUrl={"https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"}></CreatingPost>
            <FriendSuggestion></FriendSuggestion>
            <Post></Post>
            <CreateButton></CreateButton>
        </VStack>
    )
}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
