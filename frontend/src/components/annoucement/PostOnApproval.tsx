import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"
import { Link } from "react-router-dom"

const PostOnApproval: FC<{
    topic: string
    sender: string
}> = ({ topic, sender }) => {
    return (
        <Link to={"/announcement/approval/approvalDetail"}>
            <Box height={"5rem"} width={"90%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg">
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
