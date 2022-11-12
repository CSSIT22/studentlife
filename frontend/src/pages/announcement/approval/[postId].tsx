import { Flex, Spacer, Heading, Text, Stack, Box, ButtonGroup, Button, Alert, AlertIcon, useControllableState } from "@chakra-ui/react"
import React, { Children, FC } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import ModalForEvent from "../../../components/annoucement/ModalForEvent"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"

const approvalDetail = () => {
    const params = useParams().postId
    console.log(params)
    const postId = parseInt(params + "")
    const post = postInfoTest.filter((el) => {
        return el.postId == parseInt(params + "")
    })
    const [allPost, setAllPost] = React.useState(postInfoTest)

    console.log(allPost)
    const changeStatus = (status: string) => {
        setAllPost(
            allPost.map((el) => {
                if (el.postId == postId) {
                    el.status = status
                }
                return el
            })
        )
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl" opacity={{ base: 100, lg: 0 }}>
                    <Link to="/announcement/approval">
                        <GrClose />
                    </Link>
                </Text>
                {/* <Spacer /> */}
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
                            return el.targetType
                        })}{" "}
                        {post.map((el) => {
                            return el.targetValue
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
            <Box width="100%" p="5" mt="14">
                <Flex justifyContent={"space-between"}>
                    <Link to={"/announcement/approval"}>
                        <Button colorScheme="orange" onClick={() => changeStatus("approve")}>
                            Approve
                        </Button>
                    </Link>
                    <Link to={"/announcement/approval"}>
                        <Button onClick={() => changeStatus("disapprove")}>Disapprove</Button>
                    </Link>
                </Flex>
            </Box>
        </AppBody>
    )
}
export default approvalDetail
