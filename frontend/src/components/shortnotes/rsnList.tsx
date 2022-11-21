import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"

const rsnList: FC<{
    topic: String
}> = ({ topic }) => {
    return (
        <Flex boxShadow={"md"} bg={"white"} rounded={8} p={5} justifyContent={"center"} alignItems={"center"}>
            {topic}
        </Flex>
    )
}

export default rsnList
