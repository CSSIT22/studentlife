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
    // const [posts, setposts] = useState<any>([])
    // // const getData = API.get("/timeline/getposts") old mockup data
    // // const getPost = API.get("/timeline/getPostList") // data from database
    // const getPost = API.get("/timeline/getStudentPost")
    // useEffect(() => {
    //     getPost.then(res => {
    //         setposts(res.data)
    //     })
    // }, [])
    // console.log(posts)
    const [postset, setpostset] = useState(1)

    window.onscroll = function (ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
            setpostset(postset + 1)
        }
    }
    return (
        <VStack>
            <AnnounceList />
            <FriendSuggestion></FriendSuggestion>
            <CreateButton></CreateButton>
            {/* <Post></Post> */}
            {[...Array(postset).keys()].map(item => <Post i={item} key={item} />)}

            {/* <FriendSuggestion></FriendSuggestion>
            <Post></Post> */}
        </VStack>
    )
}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
