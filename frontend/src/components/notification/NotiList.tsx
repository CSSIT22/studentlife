import { Box, Stack, Text } from "@chakra-ui/react"
import React from "react"
import NotiObject from "./NotiObject"

const NotiList = () => {
    return (
        <Box>
            <Text fontSize={"sm"}>Today</Text>
            <Stack spacing={3}>
                <NotiObject />
                <NotiObject />
                <NotiObject />
            </Stack>
        </Box>
    )
}

export default NotiList
