import { Flex, Heading, Spacer, Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { FC } from "react"
import { VscDebugRestart } from "react-icons/vsc"

const PostOnRecycle: FC<{
    topic: string
    sender: string
    expired: string
    onClick: Function
    id: string
    status: string
    onOpen: Function
}> = ({ topic, sender, expired, onClick, id, status, onOpen }) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true
    })
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
            _hover={{ backgroundColor: "rgb(243 244 246)" }}
        >
            <Flex alignItems={"center"} height="100%">
                <>
                    {(() => {
                        if (!isMobile) {
                            return (
                                <Box>
                                    <Heading size={"sm"} overflow={"hidden"} whiteSpace="nowrap" textOverflow="ellipsis" width={{ base: "260px", md: "100%" }}>{topic}</Heading>
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

                <Spacer />
                <Box width={{base:"",md:"10%"}}>
                    <Flex direction={"column"} alignItems="end">
                        <VscDebugRestart fontSize={"2rem"} color="#E65D10" />
                        <Text fontSize={"xs"}>{expired}</Text>
                    </Flex>

                </Box>

            </Flex>
        </Box>
    )
}

export default PostOnRecycle
