import { post } from "@apiType/announcement"
import { Box, Flex, Grid, GridItem, Heading, Spacer, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { BsPinAngle, BsPinAngleFill } from "react-icons/all"
import { Link } from "react-router-dom"
import API from "src/function/API"

const PostOnAnnouncementPage: FC<{
    topic: string
    sender: string
    status: boolean
    allPost: Array<any>
    id: string
    onClick: Function
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>>
}> = ({ topic, sender, status, allPost, setAllPost, id, onClick }) => {
    const [stat, setStat] = useState(status);

    const state = (stat: boolean) => {
        if (stat) {
            return <BsPinAngleFill fontSize={"2rem"} onClick={() => toggle()} color="#E65300" />
        } else {
            return <BsPinAngle fontSize="2rem" onClick={() => toggle()} color="#7A8A99" />
        }
    }
    const toggle = () => {
        onClick()
        setStat(!stat)
        API.post<post>("/announcement/editpinstatus", { postId: id, pinStatus: !status })
    }
    const isMobile = useBreakpointValue({
        base: false,
        md: true
    })
    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="white" rounded="lg" shadow={"md"} _hover={{ backgroundColor: "rgb(243 244 246)" }}
        >
            <Grid templateColumns="8fr 1fr" gap={4}>
                <GridItem h="10">
                    <Link to={`/announcement/detail/${id}`}>
                        <>
                            {(() => {
                                if (!isMobile) {
                                    return (
                                        <Box>
                                            <Heading size={"sm"} overflow={"hidden"} whiteSpace="nowrap" textOverflow="ellipsis" width="250px" >{topic}</Heading>
                                            <Text fontSize={"xs"}>{sender}</Text>
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Flex flexDirection={"column"} justifyContent="center" height={"100%"}>
                                            <Heading size={"sm"} >{topic}</Heading>
                                            <Text fontSize={"xs"}>{sender}</Text>
                                        </Flex>
                                    )
                                }
                            })()}
                        </>

                    </Link>
                </GridItem>

                <GridItem h="10">
                    <Box width="100%" cursor={"pointer"}>
                        <Flex justifyContent={"end"}>{state(stat)}</Flex>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default PostOnAnnouncementPage
