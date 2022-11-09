import { Stack, Text, Divider} from "@chakra-ui/react"
import React from "react"
import NotiObjectViewAll from "./NotiObjectViewAll"

const NotiListViewAll = () => {
    return (
        <div>
            <Text>Today</Text>
            <Stack spacing={1}>
                <NotiObjectViewAll  />
                <Divider />
                <NotiObjectViewAll />
                <Divider />
                <NotiObjectViewAll />
                <Divider />
                <NotiObjectViewAll />
                <Divider />
                <NotiObjectViewAll />
                <Divider />
                <NotiObjectViewAll />
                <Divider />
                <NotiObjectViewAll />
            </Stack>
        </div>
    )
}

export default NotiListViewAll
