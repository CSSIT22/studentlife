import { Box, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../components/share/app/AppBody"
import Feed from "../../components/timeline/Feed"

const index = () => {
    return (
        <AppBody secondarynav={[{ name: "Timeline Testing Ground", to: "/timeline" }]}>
            <Feed></Feed>
        </AppBody>
    )
}

export default index
