import { Avatar, Box, Button, Heading, HStack, Image, VStack, Text, Container, Icon, StackDivider, Input, SimpleGrid, Center } from "@chakra-ui/react"
import { Any } from "@react-spring/types"
import React, { useEffect, useRef, useState } from "react"
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
    const [isLoading, setLoading] = useState(false);
    const [postset, setpostset] = useState(1)
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const handleScroll = () => {
        if (isLoading) return
        const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        // user scrolled enough
        if (windowRelativeBottom <= document.documentElement.clientHeight) {
            // fetch 20 post every 5000 px
            setpostset(prev => prev + 1);
        }
        // console.log(postset, currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    });


    return (
        <VStack>
            <AnnounceList />
            <FriendSuggestion></FriendSuggestion>
            <CreateButton></CreateButton>
            {/* <Post></Post> */}
            {[...Array(postset).keys()].map(item => <Post i={item} key={item} isLoading={isLoading} setLoading={setLoading} />)}

            {/* <FriendSuggestion></FriendSuggestion>
            <Post></Post> */}
        </VStack>
    )
}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
