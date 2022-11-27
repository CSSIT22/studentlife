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
import PostImage from "../../../components/blog/PostImage"
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
    const [post, setPost] = useState<any>(null)
    useEffect(() => {
        API.get("/blog/searchPost/" + param.postId).then(item => setPost(item.data))
    }, [])
    return (
        <AppBody>
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            <Profile image="data:image/jpeg;base64,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" />

                            <Box marginLeft={"4"}>
                                <Username name="Cat 1234" />

                                <Time date={13} month={11} year={2022} />
                            </Box>

                            <Spacer />

                            <Optionbutton />
                        </Flex>
                    </Box>
                    <PostText
                        text={post.text}
                    />
                    <PostImage image="https://i.redd.it/ujfngj2v25k91.jpg" />
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
