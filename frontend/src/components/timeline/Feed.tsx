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
import AnnounceList from "../annoucement/AnnounceList"

export const Feed = () => {
    const [posts, setposts] = useState<any>([])
    // const getData = API.get("/timeline/getposts") old mockup data
    const getPost = API.get("/timeline/getPostList") // data from database
    useEffect(() => {
        getPost.then(res => {
            setposts(res.data)
            console.log(res.data)
        })
    }, [])

    const [reacts, setreacts] = useState<any>([])
    const getReact = API.get("/timeline/getReacted")
    useEffect(() => {
        getReact.then(res => {
            setreacts(res.data)
        })
    })

    function CurrentDate(): string {
        var date: Date = new Date()
        var dmy = date.toDateString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        // var seconds = date.getSeconds().toString()
        let currentDate: string = dmy + " " + hours + ":" + minutes /* + ":" + seconds */
        return currentDate
    }

    return (
        <VStack>
            <AnnounceList />
            <FriendSuggestion></FriendSuggestion>
            <CreateButton></CreateButton>
            {posts.map((item: any, index: any) => (
                <div key={index}>
                    {item.posts.map((detail: any, n: number) => (
                        <Box marginTop={"2"} p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="hidden" fontWeight="semibold">
                            <HStack>
                                <Avatar size="md" name={item?.fname} src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item?.userId} />
                                <VStack spacing="0.5" align={"-moz-initial"}>
                                    <Text align="left">{item?.fName} {item?.lName}</Text>
                                    <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                                        {detail.lastEdit.CurrentDate()}
                                    </Text>
                                </VStack>
                            </HStack>
                            <Container p="1" fontWeight="normal" key={n}>
                                {detail.body}

                                <Image src={item.media} alt="" p="1" fit={"cover"} />
                            </Container>
                            <HStack spacing="0.5">
                                <Icon as={AiFillLike} color="#E65300"></Icon>
                                {reacts.map((detail: any, n: number) => (
                                    <Text p="1" fontSize="xs">
                                        {detail.emoteId}
                                    </Text>
                                ))}
                                <Icon as={AiOutlineShareAlt}></Icon>
                            </HStack>
                        </Box>
                    ))}
                </div>
            ))}
            {/* <FriendSuggestion></FriendSuggestion>
            <Post></Post> */}
        </VStack>
    )
}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
