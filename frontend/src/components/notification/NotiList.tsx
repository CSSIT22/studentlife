import { Stack, Text } from "@chakra-ui/react"
import React from "react"
import NotiObject from "./NotiObject"

const NotiList = () => {
    return (
        <div>
            <Text>Today</Text>
            <Stack spacing={3}>
                <NotiObject />
                <NotiObject />
                <NotiObject />
            </Stack>
        </div>
    )
}

export default NotiList
