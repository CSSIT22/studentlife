import { Stack, Text} from "@chakra-ui/react"
import React from "react"
import NotiObjectViewAll from "./NotiObjectViewAll"

const NotiListViewAll = () => {
    return (
        <div>
            <Text>Today</Text>
            <Stack spacing={3}>
                <NotiObjectViewAll />
                <NotiObjectViewAll />
                <NotiObjectViewAll />
            </Stack>
        </div>
    )
}

export default NotiListViewAll
