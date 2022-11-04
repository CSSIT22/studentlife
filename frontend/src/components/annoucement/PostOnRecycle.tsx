import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const PostOnRecycle:FC<{
    topic:string,
    sender:string,
    expired:string
}> = ({topic,sender,expired}) => {
    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg">
            <Flex alignItems={"center"}>
                <Box>
                    <Heading size={"md"}>{topic}</Heading>
                    <Heading size={"xs"}>{sender}</Heading>
                </Box>
                <Spacer />
                <Box textAlign={"right"}>
                    <Text fontSize={"xs"}>Expired date</Text>
                    <Text fontSize={"xs"}>{expired}</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnRecycle