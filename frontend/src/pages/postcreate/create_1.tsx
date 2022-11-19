import { Center, Flex, Spacer, Box, Button } from "@chakra-ui/react"
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
                                <PostType_modal />
                            </Box>

                            <Spacer />

                            <CancelButton />
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

export default create
