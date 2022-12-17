import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"
import { Link } from "react-router-dom"

const PostOnApproval: FC<{
    topic: string
    sender: string
    // status: string
    id: string
}> = ({ topic, sender, id }) => {
    return (
        <Link to={`/announcement/approval/${id}`}>
            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="white" rounded="lg" cursor="pointer" shadow={"md"}>
                <Flex alignItems={"center"}>
                    <Box>
                        <Heading size={"sm"}>{topic}</Heading>
                        <Text fontSize={"xs"}>{sender}</Text>
                    </Box>
                </Flex>
            </Box>
        </Link>
    )
}

export default PostOnApproval
