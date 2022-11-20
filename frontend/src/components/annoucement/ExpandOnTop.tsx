import { Flex, Heading, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { TfiAnnouncement } from "react-icons/tfi"

const ExpandOnTop: FC<{
    topic: string
    sender: string
}> = ({ topic, sender }) => {
    return (
        <Flex alignItems={"center"} py={"5"} borderBottom={"1px solid"}>
            <Box pr={"5"}>
                <TfiAnnouncement fontSize={"1.5rem"} color="#E65300" />
            </Box>
            <Box>
                <Heading size={"sm"}>{topic}</Heading>
                <Text fontSize={"xs"}>{sender}</Text>
            </Box>
        </Flex>
    )
}

export default ExpandOnTop
