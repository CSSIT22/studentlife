import { Avatar, Flex, Box, Center, Container, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai"
import API from "src/function/API"
import AppBody from "../share/app/AppBody"
import Feed from "./Feed"
import { Postdata } from "./Postdata"
import EmojiReaction from "../blog/EmojiReaction"
import CommentButton from "../blog/ReRouteButton"
import RemodButton from "../blog/RemodButton"
import Optionbutton from "../blog/Optionbutton"
import EmojiFeelingTelling from "../blog/EmojiFeelingTelling"
import PostFile from "../blog/PostFile"
import { useNavigate, useParams } from "react-router-dom"
import ReRouteButton from '../blog/ReRouteButton';
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

export const Post = (prop: any) => {
    const [posts, setposts] = useState<any>([])
    // const getData = API.get("/timeline/getposts") old mockup data
    // const getPost = API.get("/timeline/getPostList") // data from database == User_Profile then Student_Post
    const getPost = API.get("/timeline/getStudentPost/" + prop.i) // data from database == Student_Post then User_Profile

    const didFetch = useRef<boolean>(false);
    useEffect(() => {
        if (didFetch.current || prop.isLoading) return;
        if (prop.setLoading)
            prop.setLoading(true)
        getPost.then(res => {
            setposts(res.data)
            console.log(res.data)
        }).finally(() => {
            if (prop.setLoading)
                prop.setLoading(false)
        })
        return () => {
            didFetch.current = true;
        }
    }, [])

    const handleSetSelectedEmoji = (emoji: JSX.Element | null) => {
        // do something with the selected emoji
        API.post<any>("/blog/reactopost", {
            postId: posts.postId,
            emoteId: emoji?.props
        })

    };

    const param = useParams()
    const navigate = useNavigate()

    const goToPost = (go: any) => {

        let path = "/blog/search/" + go
        navigate(path);
    }


    // function CurrentDate(): string {
    //     var date: Date = new Date()
    //     var dmy = date.toDateString()
    //     var hours = date.getHours().toString()
    //     var minutes = date.getMinutes().toString()
    //     // var seconds = date.getSeconds().toString()
    //     let currentDate: string = dmy + " " + hours + ":" + minutes /* + ":" + seconds */
    //     return currentDate
    // }

    // let sortedScore = Postdata.sort((a, b) => (a.score > b.score ? -1 : 1))

    return (
        posts.map((postDt: any, index: any) =>
            <div key={index}>
                <VStack p="3"> // if we're not using VStack & p="3" here, our posts will have no padding between each of them.. ????????????????????????????????????????????????????????????????????????
                    <Box width={"100%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                        {/* <Text align="right"> score: {postDt.score} </Text> */}
                        <Flex justifyContent="flex-end" marginTop={"10px"}><Optionbutton /></Flex>
                        <HStack marginTop={"-60px"}>
                            <Avatar size="md" name={postDt.postOwner.fName} src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + postDt?.postOwner.userId} />
                            <VStack spacing="0.5" align={"-moz-initial"}>
                                <Text align="left">{postDt.postOwner.fName + " " + postDt.postOwner.lName}</Text>
                                <Text align="left" color="gray.500" fontWeight="semibold" fontSize="xs">
                                    {new Date(postDt.lastEdit).toLocaleDateString("th-TH")} {new Date(postDt.lastEdit).toLocaleTimeString("th-TH")}
                                </Text>
                            </VStack>
                        </HStack>

                        <Container p="1" fontWeight="normal">
                            {postDt?.files.length === 1 &&
                                < PostFile file={postDt.files[0]?.fileAddress}
                                />}
                            {/* <Image src={postDt.media} alt="" p="1" fit={"cover"} /> */}
                        </Container>
                        <Center>
                            <Box marginTop={"6"} display="flex" gap={10}>
                                <Box>
                                    <EmojiReaction setSelectedEmoji={handleSetSelectedEmoji} emojiname={postDt?.reacted.emoteId} />
                                </Box>
                                <Box>
                                    <EmojiFeelingTelling number={postDt._count.studentsReacted} />
                                </Box>
                                <Box>
                                    <ReRouteButton onClick={() => goToPost(postDt.postId)}>Go To This Post</ReRouteButton>
                                </Box>
                                <Box>
                                    <RemodButton text={"modlifes.me/blog/search/" + postDt.postId} />
                                </Box>
                            </Box>
                        </Center>
                    </Box>
                </VStack>
            </div>
        )
    )

    // return (
    //     <div className="mainBox">
    //         {renderPost}
    //     </div>
    // )
}

export default Post