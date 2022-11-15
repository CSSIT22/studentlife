import { Heading, Box, Text, Flex, Divider } from "@chakra-ui/react"
import React from "react"
import { FC } from "react"
import { BsFillPersonFill } from "react-icons/bs"

const FileComment: FC<{ name: string; comment: string }> = ({ name, comment }) => {
    return (
        <Flex width={"100%"} p={2}>
            <Box p={2}>
                <BsFillPersonFill fontSize={"2rem"}></BsFillPersonFill>
            </Box>
            <Box p={1}>
                <Text fontSize="lg"> {name}</Text>
                <Text fontSize="sm"> {comment}</Text>
            </Box>
        </Flex>
    )
}

export default FileComment
