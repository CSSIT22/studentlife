import { Center, Flex, Spacer, Box, Button, Textarea } from "@chakra-ui/react"
import React from "react"
import CancelButton from "../../components/blog/cancleButton"
import CommentButton from "../../components/blog/CommentButton"
import EmojiReaction from "../../components/blog/EmojiReaction"
import Optionbutton from "../../components/blog/Optionbutton"
import PostImage from "../../components/blog/PostImage"
import PostText from "../../components/blog/PostText"
import PostType_modal from "../../components/blog/PostType_modal"
import Profile from "../../components/blog/Profile"
import RemodButton from "../../components/blog/RemodButton"
import Time from "../../components/blog/time"
import Username from "../../components/blog/Username"
import UsernameOnly from "../../components/blog/UsernameOnly"
import AppBody from "../../components/share/app/AppBody"
import { CiYoutube, CiImageOn } from "react-icons/ci"
import TextAreaPost from "../../components/blog/TextAreaPost"
import ImageInsert from "../../components/blog/ImageInsert"
import VideoInsert from "../../components/blog/VideoInsert"
import PostButton from "../../components/annoucement/PostButton"

const create = () => {
    return (
        <AppBody>
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            <Profile image="https://www.sit.kmutt.ac.th/wp-content/uploads/2022/11/narongrit.jpg" />

                            <Box marginLeft={"4"}>
                                <UsernameOnly name="Narongrit Waraporn" />
                                <Box mt={2}>
                                    <PostType_modal />
                                </Box>
                            </Box>

                            <Spacer />

                            <CancelButton />
                        </Flex>
                    </Box>

                    <TextAreaPost />

                    <Center>
                        <ImageInsert />
                        <Spacer />
                        <VideoInsert />
                    </Center>
                    <Center>
                        <Box marginTop={"6"}>
                            <PostButton />
                        </Box>
                    </Center>
                </Box>
            </Center>
        </AppBody>
    )
}

export default create
