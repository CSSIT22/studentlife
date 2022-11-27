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

const Feed = () => {
    function CurrentDate(): string {
        var date: Date = new Date()
        var dmy = date.toDateString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        // var seconds = date.getSeconds().toString()
        let currentDate: string = dmy + " " + hours + ":" + minutes /* + ":" + seconds */
        return currentDate
    }

    // function ScoreUp(likes: number, comments: number, shares: number) {
    //     comments *= 4 // 1 comment = 4 scores
    //     shares *= 2 // 1 shares = 2 scores
    //     return likes + comments + shares
    // }

    function RandomNumber() {
        return Math.floor(Math.random() * 1001)
    }

    const [posts, setposts] = useState<any>([])
    const getData = API.get("/timeline/getposts")
    useEffect(() => {
        getData.then(res => {
            setposts(res.data)
        })
    }, [])


    return (
        // <VStack>
        //     <CreatingPost photoUrl="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"></CreatingPost>
        //     <Post
        //         id="1"
        //         name="Mr.Cat 1"
        //         dateTime={CurrentDate()} /*"23m"*/
        //         message="Hello from the other side!"
        //         // likes=RandomNumber()
        //         likes={RandomNumber()}
        //         comments={RandomNumber()}
        //         shares={RandomNumber()}
        //         avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
        //         media="https://img.freepik.com/premium-vector/boy-waving-hand-greeting-cute-people-illustration_107355-500.jpg?w=1380"
        //     />
        //     <FriendSuggestion photoUrl="" year={0} department={""} faculty={""}></FriendSuggestion>
        //     <Post
        //         id="2"
        //         name="Mr.Cat 2"
        //         dateTime={CurrentDate()} /*"1d"*/
        //         message="Seek success, but always be prepared for random cats."
        //         // likes={Math.floor(Math.random() * 1001)}
        //         likes={RandomNumber()}
        //         comments={RandomNumber()}
        //         shares={RandomNumber()}
        //         avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
        //         media="https://img.freepik.com/premium-vector/smiling-young-man-showing-thumbs-up-illustration-hand-drawn-style_213307-233.jpg?w=1380"
        //         score={0}
        //     />
        //     <Post
        //         id="3"
        //         name="Mr.Cat 3"
        //         dateTime={CurrentDate()} /*"4h"*/
        //         message="Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?"
        //         // likes={Math.floor(Math.random() * 1001)}
        //         likes={RandomNumber()}
        //         comments={RandomNumber()}
        //         shares={RandomNumber()}
        //         avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
        //         media="https://img.freepik.com/premium-vector/big-obstacle-concept-illustration_1133-825.jpg?w=1800"
        //         score={0}
        //     />
        //     <Post
        //         id="4"
        //         name="Mr.Cat 4"
        //         dateTime={CurrentDate()} /*"14m"*/
        //         message="Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania);
        //         gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes."
        //         // likes={Math.floor(Math.random() * 1001)}
        //         likes={RandomNumber()}
        //         comments={RandomNumber()}
        //         shares={RandomNumber()}
        //         avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
        //         media=""
        //         score={0}
        //     />
        // </VStack>
        <VStack>
            {posts.map((item: any) => (
                <><Box p="3" minW="sm" maxW="xl" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="hidden" fontWeight="semibold">
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing="4" align="stretch">
                        <HStack>
                            <Avatar size="md" src={item.avatar} />
                            <Input placeholder="What's on your mind" size="md" variant="filled" />
                        </HStack>
                        <HStack spacing={4}>
                            <Icon as={FaVideo} color="#EE3E1B"></Icon>
                            <Text p="1" fontSize="s">
                                Video
                            </Text>
                            <Icon as={FaRegImages} color="#3DEE23"></Icon>
                            <Text p="1" fontSize="s">
                                Photo
                            </Text>
                            <Icon as={FaRegGrinSquint} color="#F9DB62"></Icon>
                            <Text p="1" fontSize="s">
                                Feeling/Activity
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
                    <Box minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="auto" fontWeight="semibold">
                        <Box w="full" h="7" bgColor="orange.300" p="1">
                            <Text color="white">Suggestion for You</Text>
                        </Box>
                        <Swiper>
                            <SimpleGrid row={1}>
                                <HStack>
                                    <SwiperSlide>
                                        <Center>
                                            <SuggestedFriend
                                                photoUrl={item.avatar}
                                                year={3}
                                                department="Computer Science"
                                                faculty="IT"
                                            ></SuggestedFriend>
                                        </Center>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Center>
                                            <SuggestedFriend
                                                photoUrl={item.avatar}
                                                year={2}
                                                department="Food Engineering"
                                                faculty="Engineering"
                                            ></SuggestedFriend>
                                        </Center>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Center>
                                            <SuggestedFriend
                                                photoUrl={item.avatar}
                                                year={2}
                                                department="Civil Engineering"
                                                faculty="Engineering"
                                            ></SuggestedFriend>
                                        </Center>
                                    </SwiperSlide>
                                </HStack>
                            </SimpleGrid>
                        </Swiper>
                    </Box>
                    <><Box p="3" minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="hidden" fontWeight="semibold">
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
                        <Heading key={item.id}>{item.name}</Heading></></>
            ))}
        </VStack>
    )
}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
