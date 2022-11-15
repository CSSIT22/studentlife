import { Flex, Stack, Heading, Text, Box } from "@chakra-ui/react"
import React, { FC } from "react"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"
import AppBody from "../share/app/AppBody"

const PostDetail: FC<{
    allPost: Array<any>
    selectPost: number
}> = ({ allPost,selectPost }) => {
    const post = allPost.filter((el) => el.id == selectPost)
    return (
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <Link to="/announcement">
                        <GrClose />
                    </Link>
                </Text>
            </Flex>
            <Stack spacing={3} p="5">
                <Heading as="h2" size="xl">
                    {post.map((el) => {
                        return el.topic
                    })}
                </Heading>
                <Box>
                    <Text fontSize="md">
                        Sender:{" "}
                        {post.map((el) => {
                            return el.sender
                        })}
                    </Text>
                    <Text fontSize="md">
                        To:{" "}
                        {post.map((el) => {
                            return el.target
                        })}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="justify">
                        {post.map((el) => {
                            return el.detail
                        })}
                    </Text>
                </Box>
            </Stack>
        </AppBody>
    )
}

export default PostDetail
