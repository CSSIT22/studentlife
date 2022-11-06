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
<<<<<<< HEAD
                        <Button bg={"transparent"}> Mark all as read</Button>
                        <Button bg={"transparent"}>
                            <FiSettings size={"1.5em"} />
                        </Button>
=======
                        <Button> Mark all as read</Button>
                        <Center>
                            <FiSettings />
                        </Center>
>>>>>>> parent of 662f303 (ADD Scroll + viewAll button)
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
