import {
    Box,
    Heading,
    VStack,
    Text,
    Center,
    Image,
    Button,
    ButtonGroup,
    SimpleGrid,
    Grid,
    GridItem,
    Flex,
    IconButton,
    Spacer,
    Container,
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    HStack,
    Modal,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react"
import { PhoneIcon, AddIcon, WarningIcon, HamburgerIcon } from "@chakra-ui/icons"
import AppBody from "../../../components/share/app/AppBody"
import { AiFillAccountBook } from "react-icons/ai"
import Profile from "../../../components/blog/Profile"
import Optionbutton from "../../../components/blog/Optionbutton"
import PostText from "../../../components/blog/PostText"
import PostFile from "../../../components/blog/PostFile"
import EmojiReaction from '../../../components/blog/EmojiReaction';
// import CommentButton from "../../../components/blog/CommentButton"
import RemodButton from "../../../components/blog/RemodButton"
import Username from "../../../components/blog/Username"
import Time from "../../../components/blog/Time"
import EmojiFeelingTelling from "../../../components/blog/EmojiFeelingTelling"
import API from "src/function/API"
import { useEffect, useState, useRef } from "react"
import { getItem } from "localforage"
import { useParams } from "react-router-dom"
import file from 'src/pages/groups/id/[communityID]/file';
import { Avatar } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import react from '@vitejs/plugin-react';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [cMent, setCment] = useState()

    const param = useParams()
    // const [file, setFile,] = useState<any>(null)
    const [post, setPost,] = useState<any>(null)
    const [emoji, setEmoji,] = useState<any>(null)
    // const getData = API.get("/blog/searchPost/" + param.postId)
    const navigate = useNavigate()
    useEffect(() => {
        API.get("/blog/search/" + param.postId).then(item => {
            console.log(item.data)
            // console.log("this is a file address =>" + post.fileAddress)
            setPost(item.data)

        })

        // console.log(param.postId)
        // console.log(getData)

        // getData.then((res) => {
        //     console.log(res.data)
        // })
        // yoooo

    }, [])



    const [comment, setComment] = useState<any>({})
    const [allComments, setAllComments] = useState<any>([])
    const [commentId, setCommentId] = useState<any>(0)

    useEffect(() => {
        API.get("/blog/searchComment/" + param.postId).then(dataComment => { setComment(dataComment.data[0]); setAllComments(dataComment.data) })
        console.log("This is all comment " + allComments)
    }, [])
    useEffect(() => {
        setComment(allComments[commentId])
    }, [commentId])

    const goToUser = () => {

        let path = "/user";
        navigate(path);
    }

    const goToFullPost = () => {

        let path = "/blog/search/" + param.postId + param.postId;
        navigate(path);
    }

    const submitCment = (pid: any) => {
        API.post("/blog/comment/" + pid, { cMent }).then((res) => (window.location.reload()))
    }

    const handleSetSelectedEmoji = (emoji: JSX.Element | null) => {
        // do something with the selected emoji
        API.post<any>("/blog/reactopost", {
            postId: post.postId,
            emoteId: emoji?.props
        })

    };

    // let emojiname: string

    // if (post?.react.emoteId != null) {
    //     emojiname = post?.react.emoteId
    // } else {
    //     emojiname = ""
    // }

    console.log(post?.react.emoteId)




    return (
        <AppBody>
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            {post &&
                                <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + post.postOwner.userId} size="lg" onClick={goToUser} />
                            }
                            <Box marginLeft={"4"}>
                                {post &&
                                    <Username name={post.postOwner.fName + " " + post.postOwner.lName} />
                                }
                                {post &&

                                    <Time date={new Date(post.lastEdit)} />
                                }
                            </Box>

                            <Spacer />

                            <Optionbutton />
                        </Flex>
                    </Box>
                    {post && <PostText
                        text={post.body}
                    />}
                    {/* <PostImage image="" /> */}
                    {post?.files.length === 1 &&
                        <PostFile file={post.files[0].fileAddress}
                        />}


                    <Center>
                        <Box marginTop={"6"} display="flex" gap={10}>
                            <Box>
                                <EmojiReaction setSelectedEmoji={handleSetSelectedEmoji} emojiname={post?.react.emoteId} />
                            </Box>
                            <Box>
                                {post &&
                                    <EmojiFeelingTelling number={post._count.studentsReacted} />
                                }
                            </Box>
                            <Box>
                                <Button colorScheme="orange" size="lg" w={250} onClick={goToFullPost}>
                                    Go to Post!
                                </Button>
                                <Modal
                                    initialFocusRef={initialRef}
                                    finalFocusRef={finalRef}
                                    isOpen={isOpen}
                                    onClose={onClose}
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Comment</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <FormControl>
                                                <FormLabel>Your comment here</FormLabel>
                                                <Textarea placeholder="Your Question Comment..." h={"200px"} onChange={(e: any) => setCment(e.target.value)} />
                                            </FormControl>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme='orange' mr={3} onClick={() => submitCment(param.postId)}>
                                                post your comment!
                                            </Button>
                                            <Button onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Box>
                            <Box>
                                <RemodButton />
                            </Box>
                        </Box>
                        <VStack paddingLeft="12">
                            {allComments?.comment && allComments?.comment?.map((item: any) => <HStack key={item.commentId} gap="5px">
                                <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item.userId}></Avatar>
                                <VStack alignItems="flex-start">
                                    <Text as='b'>{item.fName} {item.lName} </Text>
                                    <p>{item.comment}</p>
                                </VStack>
                            </HStack>)
                            }
                        </VStack>
                    </Center>
                </Box>
            </Center>
        </AppBody>
    )
}

export default Home
