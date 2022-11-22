import { Heading, Box, Text, Flex, Divider } from "@chakra-ui/react"
import React from "react"
import { FC } from "react"
import { BsFillPersonFill } from "react-icons/bs"
import { BiCommentDetail } from "react-icons/bi"

const FileComment: FC<{ name: string; comment: string }> = ({ name, comment }) => {
    return (
        <Flex width={"100%"} p={2} flexDirection={"row"}>
            <Box p={2}>
                <BsFillPersonFill fontSize={"2rem"}></BsFillPersonFill>
            </Box>
            <Flex p={1} flexDirection={"column"} alignItems={"start"}>
                <Text fontSize="xl"> {name}</Text>
                <Flex flexDirection={"row"} gap={"3"} alignItems={"center"}>
                    <BiCommentDetail fontSize={"1.2rem"}></BiCommentDetail>
                    <Text fontSize="lg" textColor={"gray.500"}>
                        {" "}
                        {comment}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default FileComment
