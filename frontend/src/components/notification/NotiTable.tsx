import { Box, Button, Center, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import Modulelist from "./Modulelist"
import NotiList from "./NotiList"
import { FiSettings } from "react-icons/fi"
import MarkRead from "./MarkRead"
import { Link } from "react-router-dom"

const NotiTable = () => {
    return (
        <Box>
            <Flex padding={3}>
                <Box>
                    Module :
                    <Modulelist />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead />
                        <Button size={"1em"} bg={"transparent"}>
                            <FiSettings size={"1.2em"} />
                        </Button>
                    </Stack>
                </Box>
            </Flex>
            <Stack padding={4} height="50vh" overflow="auto">
                <NotiList />
                <NotiList />
                <NotiList />
            </Stack>
            <Center paddingTop={2}>
                <Button size={"sm"}>
                    <Link to="/notification/viewAll">View All</Link>
                </Button>
            </Center>
        </Box>
    )
}

export default NotiTable
