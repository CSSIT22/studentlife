import { Box, Flex, Grid, GridItem, Heading, Spacer, Text } from "@chakra-ui/react"
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
}> = ({ topic, sender, status, allPost, setAllPost, id }) => {
    const state = (stat: boolean) => {
        if (stat) {
            return <BsPinAngleFill fontSize={"2rem"} color="#E65300" />
        } else {
            return <BsPinAngle fontSize="2rem" color="#7A8A99" />
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
        <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#white" rounded="lg" shadow={"md"}>
            <Grid templateColumns="8fr 1fr" gap={4}>
                <GridItem h="10">
                    <Link to={`/announcement/detail/${id}`}>
                        <Box>
                            <Heading size={"sm"}>{topic}</Heading>
                            <Text fontSize={"xs"}>{sender}</Text>
                        </Box>
                    </Link>
                </GridItem>

                <GridItem h="10">
                    <Box width="100%" cursor={"pointer"}>
                        <Flex justifyContent={"end"}>{state(status)}</Flex>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default PostOnAnnouncementPage
