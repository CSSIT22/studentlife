import { Flex, Spacer, Heading, Text, Stack, Box, ButtonGroup, Button, Alert, AlertIcon, useControllableState } from "@chakra-ui/react"
import React, { Children, FC } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import ModalForEvent from "../../../components/annoucement/ModalForEvent"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"

const approvalDetail = () => {
    // const ALERT = () => {
    //     alert("This announcement is approved")
    //     window.history.go(-1)
    // }
    // const ALERTT = () => {
    //     alert("This announcement is approved")
    //     window.history.go(-1)
    // }
    // apply info follow the post that user click -> not done yet
    //const [statusPostRequest, setStatusPostRequest] = React.useState("")
    //const [selectPost, setSelectPost] = React.useState(Number)
    //const [showButton, setShowButton] = React.useState(false)
    //const ApproveClick = (postId: number, status: string) => {
    //    setSelectPost(postId)
    //    setStatusPostRequest(status)
    //}

    const params = useParams().postId
    console.log(params)
    const post = postInfoTest.filter((el) => {
        return el.postId == parseInt(params + "")
    })

    console.log(post)

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            px={{ md: "3rem" }}
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
                <Box width={"80%"} textAlign="center" position={"fixed"} bottom="5rem">
                    <Flex justifyContent={"space-between"}>
                        <Button colorScheme="orange">Approve</Button>
                        <Button>Disapprove</Button>
                    </Flex>
                </Box>
            </Stack>
        </AppBody>
    )
}
export default approvalDetail
