import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import {GrDown} from 'react-icons/gr'
import {TfiAnnouncement} from 'react-icons/tfi'

const PostOnTop:FC<{
    topic: string,
    sender:string,
   
}> = ({topic,sender}) => {
    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="0" backgroundColor="#D9D9D9" rounded="lg">
            <Flex alignItems={"center"}>
                <Box pr={"5"}>
                    <TfiAnnouncement fontSize={"1.5rem"}/>
                </Box>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box>
                    <GrDown/>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnTop