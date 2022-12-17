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
} from "@chakra-ui/react"
import { PhoneIcon, AddIcon, WarningIcon, HamburgerIcon } from "@chakra-ui/icons"
import AppBody from "../../../components/share/app/AppBody"
import { AiFillAccountBook } from "react-icons/ai"
import Profile from "../../../components/blog/Profile"
import Optionbutton from "../../../components/blog/Optionbutton"
import PostText from "../../../components/blog/PostText"
import PostFile from "../../../components/blog/PostFile"
import EmojiReaction from "../../../components/blog/EmojiReaction"
import CommentButton from "../../../components/blog/CommentButton"
import RemodButton from "../../../components/blog/RemodButton"
import Username from "../../../components/blog/Username"
import Time from "../../../components/blog/Time"
import EmojiFeelingTelling from "../../../components/blog/EmojiFeelingTelling"
import API from "src/function/API"
import { useEffect, useState } from "react"
import { getItem } from "localforage"
import { useParams } from "react-router-dom"

const Home = () => {

    const param = useParams()
    const [file, setFile,] = useState<any>(null)
    const [post, setPost,] = useState<any>(null)
    // const getData = API.get("/blog/searchPost/" + param.postId)
    useEffect(() => {
        API.get("/blog/search/" + param.postId).then(item => {
            console.log(item.data)
            setPost(item.data)
        })

        // console.log(param.postId)
        // console.log(getData)

        // getData.then((res) => {
        //     console.log(res.data)
        // })

    }, [])
    return (
        <AppBody>
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            {post &&
                                <Profile image={import.meta.env.VITE_APP_ORIGIN + "/user/profile/" + post.postOwner.userId} />
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
                    {post &&
                        <PostFile file={post.imgId}
                        />}

                    <Center>
                        <Box marginTop={"6"} display="flex" gap={10}>
                            <Box>
                                <EmojiReaction />
                            </Box>
                            <Box>
                                <EmojiFeelingTelling number={10} emotion="K" />
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
            </Center>
        </AppBody>
    )
}

export default Home
