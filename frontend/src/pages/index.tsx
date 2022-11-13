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
import AppBody from "../components/share/app/AppBody"
import { AiFillAccountBook } from "react-icons/ai"
import Profile from "../components/blog/Profile"
import UsernameAndTime from "../components/blog/UsernameAndTime"
import Optionbutton from "../components/blog/Optionbutton"
import PostText from "../components/blog/PostText"
import PostImage from "../components/blog/PostImage"
import EmojiReaction from "../components/blog/EmojiReaction"
import CommentButton from "../components/blog/CommentButton"
import RemodButton from "../components/blog/RemodButton"

const Home = () => {
    return (
        <AppBody
            secondarynav={[
                {
                    name: "Test",
                    to: "/ad",
                    Icon: AiFillAccountBook,
                    subNav: [{ name: "Sub1", to: "/asd", Icon: AiFillAccountBook }],
                },
            ]}
        >
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            <Profile image="https://www.sit.kmutt.ac.th/wp-content/uploads/2022/11/narongrit.jpg" />

                            <UsernameAndTime name="Narongrit Waraporn" date={13} month={11} year={2022} />

                            <Spacer />

                            <Optionbutton />
                        </Flex>
                    </Box>
                    <PostText
                        text="Can we get much higher? (So high)
                                Oh, oh, oh
                                Oh, oh, oh-oh, oh (Oh)
                                Can we get much higher? (So high)
                                Oh, oh, oh
                                Oh, oh, oh-oh, oh
                                Can we get much higher? (So high)
                                Oh, oh, oh
                                Oh, oh, oh-oh, oh (Oh)      
                                Can we get much higher? (So high)
                                Oh, oh, oh
                                Oh, oh, oh-oh, oh"
                    />
                    <PostImage image="https://i.redd.it/ujfngj2v25k91.jpg" />
                    <Center>
                        <Box marginTop={"6"}>
                            <Flex>
                                <Box>
                                    <EmojiReaction />
                                </Box>
                                <Box marginLeft={8}>
                                    <CommentButton />
                                </Box>
                                <Box marginLeft={8}>
                                    <RemodButton />
                                </Box>
                            </Flex>
                        </Box>
                    </Center>
                </Box>
            </Center>
        </AppBody>
    )
}

export default Home
