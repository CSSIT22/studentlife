import { Flex, Heading, Spacer, Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"
import { Link } from "react-router-dom"

const PostOnApproval: FC<{
    topic: string
    sender: string
    id: string
}> = ({ topic, sender, id }) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true
    })
    
    return (
        <Link to={`/announcement/approval/${id}`}>
            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="white" rounded="lg" cursor="pointer" shadow={"md"} _hover={{ backgroundColor: "rgb(243 244 246)" }}
            >
                {(() => {
                    if (!isMobile) {
                        return (
                            <Flex alignItems={"center"} height="100%">
                                <Box height={"100%"}>
                                    <Heading size={"sm"} overflow={"hidden"} whiteSpace="nowrap" textOverflow="ellipsis" width="310px" >{topic}</Heading>
                                    <Text fontSize={"xs"}>{sender}</Text>
                                </Box>

                            </Flex>
                        )
                    } else {
                        return (
                            <Flex height="100%" flexDirection={"column"} justifyContent="center">
                                    <Heading size={"sm"} >{topic}</Heading>
                                    <Text fontSize={"xs"}>{sender}</Text>
                            </Flex>
                        )
                    }
                })()}

            </Box>
        </Link>
    )
}

export default PostOnApproval
