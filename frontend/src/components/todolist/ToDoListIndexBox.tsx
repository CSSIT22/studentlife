import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { PhoneIcon, AddIcon, ArrowRightIcon } from "@chakra-ui/icons"
import React from "react"

const ToDoListIndexBox = () => {
    return (
        <Heading as="h1" size="3xl" noOfLines={1}>
            To Do List
            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg">
                <Flex alignItems={"center"}>
                    <Box>
                        <Heading size={"sm"}>CSC210 : Work 1</Heading>
                        <Text fontSize={"xs"}>Finished</Text>
                    </Box>
                    <Spacer />
                    <Box textAlign={"right"} pr={"1rem"} width=""></Box>
                </Flex>
            </Box>
        </Heading>
    )
}

export default ToDoListIndexBox
