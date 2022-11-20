import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { GrDown } from "react-icons/gr"
import { TfiAnnouncement } from "react-icons/tfi"

const PostOnTop: FC<{
    topic: string
    sender: string
    clickToExpand: Function
}> = ({ topic, sender, clickToExpand }) => {
    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="0" backgroundColor="white" rounded="lg" shadow={"md"}>
            <Flex alignItems={"center"}>
                <Box pr={"5"}>
                    <TfiAnnouncement fontSize={"1.5rem"} color="#E65300" />
                </Box>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box>
                    <GrDown onClick={() => clickToExpand()} cursor={"pointer"} />
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnTop
