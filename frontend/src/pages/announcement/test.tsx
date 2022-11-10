import { Box, Flex, Heading, Spacer,IconButton } from "@chakra-ui/react"
import React from "react"
import { GrDown, GrUp } from "react-icons/gr"
import { TfiAnnouncement } from "react-icons/tfi"
import ExpandOnTop from "../../components/annoucement/expandOnTop"
import PostOnTop from "../../components/annoucement/PostOnTop"
import AppBody from "../../components/share/app/AppBody"

const test = () => {
    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            {/* type 1 */}
            <PostOnTop topic="hey" sender="j" />
            <br />
            {/* type 2 */}
            <Box height={"30rem"} width={"100%"} px="5" mt="0" backgroundColor="#D9D9D9" rounded="lg">
                <ExpandOnTop topic="Hello" sender="j" />
                <ExpandOnTop topic="Hello" sender="j" />
                <ExpandOnTop topic="Hello" sender="j" />
                <ExpandOnTop topic="Hello" sender="j" />
                <ExpandOnTop topic="Hello" sender="j" />

                <Flex alignItems={"center"} pt={"7"}>
                    <Box pr={"7"}>
                        <Heading size={"sm"}>minimize</Heading>
                    </Box>
                    <Box>
                        <Heading size={"sm"}>shome more</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        <GrUp />
                    </Box>
                </Flex>
            </Box>

            <br />
            {/* type 3 */}
            <IconButton isRound colorScheme="orange" aria-label="Call Segun" size="lg" icon={<TfiAnnouncement fontSize={"1.5rem"}/>} />

            <br />
            <br />
            <br />
        </AppBody>
    )
}

export default test
