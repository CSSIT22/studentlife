import { Center, Flex, Spacer, Box, Button, Textarea, useToast } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import CancelButton from "../../../components/blog/cancleButton"
import CommentButton from "../../../components/blog/CommentButton"
import EmojiReaction from "../../../components/blog/EmojiReaction"
import Optionbutton from "../../../components/blog/Optionbutton"
import PostImage from "../../../components/blog/PostFile"
import PostText from "../../../components/blog/PostText"
import PostType_modal from "../../../components/blog/PostType_modal"
import Profile from "../../../components/blog/Profile"
import RemodButton from "../../../components/blog/RemodButton"
import Username from "../../../components/blog/Username"
import UsernameOnly from "../../../components/blog/UsernameOnly"
import AppBody from "../../../components/share/app/AppBody"
import { CiYoutube, CiImageOn } from "react-icons/ci"
import TextAreaPost from "../../../components/blog/TextAreaPost"
import ImageInsert from "../../../components/blog/ImageInsert"
import VideoInsert from "../../../components/blog/VideoInsert"
import PostButton from "../../../components/blog/PostButton"
import { useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import User from "../../link/data/user"


const Create = () => {
    const param = useParams()
    const [text, setText] = useState<any>("")
    const [files, setFiles] = useState<any>([])
    // const [post, setPost] = useState<any>("")
    const navigate = useNavigate()
    const user = useContext(authContext)
    // useEffect(() => {
    //     API.get("/blog/searchCreate/" + param.userId).then(item => {
    //         console.log(item.data)
    //         setPost(item.data)
    //         /**ตรงนี้ๆ */
    //     })
    // })
    const toast = useToast()

    const submit = () => {
        if (text && files) {
            const form = new FormData();
            form.append("text", text);
            form.append("upload", files);
            API.post<any>("/blog/postCreatingX",
                form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
                .then((res) => 
                navigate("/"))
        } else {
            toast({
                title: "Can't still post yet",
                description: "You have to either have text or image or video in your post.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })


        }
    }

    return (
        <AppBody>
            <Center>
                <Box marginTop={"20px"} marginBottom={"20px"} width={"75%"} padding={5} background={"white"} rounded={"lg"} shadow={"lg"}>
                    <Box>
                        <Flex>
                            <Profile image={import.meta.env.VITE_APP_ORIGIN + "/user/profile/" + user.userId} />

                            <Box marginLeft={"4"}>
                                <UsernameOnly name={user.fName + " " + user.lName} />
                                <Box mt={2}>
                                    <PostType_modal />
                                </Box>
                            </Box>

                            <Spacer />

                            <CancelButton />
                        </Flex>
                    </Box>

                    <TextAreaPost onChange={e => setText(e.target.value)} />

                    <Center>
                        <ImageInsert children files={files} setFiles={setFiles} />
                        <Spacer />
                        <VideoInsert children files={files} setFiles={setFiles} />
                    </Center>
                    <Center>
                        <Box marginTop={"6"}>
                            <PostButton onClick={submit} />
                        </Box>
                    </Center>
                </Box>
            </Center>
        </AppBody>
    )
}

export default Create

