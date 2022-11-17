import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { VscDebugRestart } from "react-icons/vsc"

const PostOnRecycle: FC<{
    topic: string
    sender: string
    expired: string
    onClick: Function
    id: number
    status: string
    onOpen: Function
}> = ({ topic, sender, expired, onClick, id, status, onOpen }) => {
    const current = new Date()
    return (
        <Box
            height={"5rem"}
            width={"100%"}
            p="5"
            mt="5"
            backgroundColor="white"
            rounded="lg"
            shadow={"md"}
            onClick={() => {
                onClick(id, status), onOpen()
            }}
            cursor="pointer"
        >
            <Flex alignItems={"center"}>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box textAlign={"right"}>
                <VscDebugRestart fontSize={"2rem"} color="#E65D10" />
                    {/* <Text fontSize={"xs"} as="b">
                        remaining
                    </Text> */}
                    <Text fontSize={"xs"}>{expired}</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnRecycle
