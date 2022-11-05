import { Box, Button, Center, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import Modulelist from "./Modulelist"
import NotiList from "./NotiList"
import { FiSettings } from "react-icons/fi"

const NotiTable = () => {
    return (
        <Box
            borderRadius="lg"
            borderWidth="1px"
            borderColor="black"
            backgroundColor="white"
            width={{ base: "100%", md: "40%" }}
            height={{ base: "80vh" }}
            padding={4}
        >
            <Flex>
                <Box>
                    <Modulelist />
                </Box>
                <Spacer />
                <Box>
                    <Button> Mark all as read</Button>
                </Box>
            </Flex>
            <Stack padding={4}>
                <Stack direction={"row"}>
                    <Text>Today</Text>
                    <Spacer />
                    <FiSettings />
                </Stack>
                <NotiList />
            </Stack>
        </Box>
    )
}

export default NotiTable
