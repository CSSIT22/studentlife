import { Box, Button, Flex, Heading, Input, Text, Radio, RadioGroup, Select, Stack, Textarea, VStack } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"

const newLibrary = () => {
    return (
        <AppBody>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box bg={"white"} rounded={8} p={10} w={"60%"}>
                    <VStack spacing={4}>
                        <Heading size={"lg"}>Create new library</Heading>

                        <Box w={"100%"}>
                            <Text>Library's name</Text>
                            <Input variant="outline" placeholder="" />
                        </Box>
                        <Button colorScheme="orange" w={"100%"}>
                            Create
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </AppBody>
    )
}

export default newLibrary
