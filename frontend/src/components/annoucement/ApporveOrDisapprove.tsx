import { Flex, Spacer, Heading, Text, Stack, Box, ButtonGroup, Button, Alert, AlertIcon } from "@chakra-ui/react"
import React, { Children, FC } from "react"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"
import AppBody from "../share/app/AppBody"

const ApproveOrDisapprove: FC<{
    allPost: Array<any>
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>>
    selectPost: number
    status: string
    isApprove: boolean
}> = ({ allPost, setAllPost, selectPost, status, isApprove }) => {
    const toggle = (changeTo: string) => {
        if (status == "waiting") {
            setAllPost(
                allPost.map((el) => {
                    if (el.id == selectPost) {
                        el.status = changeTo
                        el.isApprove = !el.isApprove
                        // isApprove is for normal user
                        // status is for creator
                    }
                    return el
                })
            )
        }
    }
    const post = allPost.filter((el) => el.id == selectPost)
    return (
        // apply info follow the post that user click -> not done yet
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <Link to={"/announcement/approval"}>
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
                <Box width={"80%"} textAlign="center" position={"fixed"} bottom="5rem">
                    <Flex justifyContent={"space-between"}>
                        <Button colorScheme="orange" onClick={() => toggle("approve")}>
                            Approve
                        </Button>
                        <Button onClick={() => toggle("disapprove")}>Disapprove</Button>
                    </Flex>
                </Box>
            </Stack>
        </AppBody>
    )
}

export default ApproveOrDisapprove
