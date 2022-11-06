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
            width={{ sm: "80%", md: "50%" }}
            height={{ base: "80vh" }}
            padding={4}
        >
            <Flex>
                <Box>
                    <Modulelist />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <Button bg={"transparent"}> Mark all as read</Button>
                        <Button bg={"transparent"}>
                            <FiSettings size={"1.5em"} />
                        </Button>
                    </Stack>
                </Box>
            </Flex>
            <Stack padding={4}>
                <NotiList />
            </Stack>
        </Box>
    )
}

export default NotiTable
