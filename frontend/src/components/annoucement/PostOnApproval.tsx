import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"
import { Link } from "react-router-dom"

const PostOnApproval: FC<{
    topic: string
    sender: string
    status: string
    id: number
   
}> = ({ topic, sender, status, id }) => {
    return (
        <Link to={`/announcement/approval/${id}`}>
            <Box
                height={"5rem"}
                width={"100%"}
                p="5"
                mt="5"
                backgroundColor="#D9D9D9"
                rounded="lg"
                
                cursor="pointer"
            >
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
