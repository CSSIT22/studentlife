import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsPinAngle, BsPinAngleFill } from "react-icons/all"
import { Link } from "react-router-dom"

const PostOnAnnouncementPage: FC<{
    topic: string
    sender: string
    status: boolean
    allPost: Array<any>
    id: number
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>>
    onSelectPost: Function
}> = ({ topic, sender, status, allPost, setAllPost, id, onSelectPost }) => {
    const state = (stat: boolean) => {
        if (stat) {
            return <BsPinAngleFill fontSize={"2rem"} onClick={toggle} />
        } else {
            return <BsPinAngle fontSize="2rem" onClick={toggle} />
        }
    }
    const toggle = () => {
        setAllPost(
            allPost.map((el) => {
                if (el.postId == id) {
                    el.pinStatus = !el.pinStatus
                }
                return el
            })
        )
    }

    return (
        // <Link to={`/announcement/detail/${id}`}>
            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg" onClick={() => onSelectPost(id)}>
                <Flex alignItems={"center"}>
                    <Box>
                        <Heading size={"sm"}>{topic}</Heading>
                        <Text fontSize={"xs"}>{sender}</Text>
                    </Box>
                    <Spacer />
                    <Box textAlign={"right"} pr={"1rem"} width="">
                        {state(status)}
                    </Box>
                </Flex>
            </Box>
        // </Link>
    )
}

export default PostOnAnnouncementPage
