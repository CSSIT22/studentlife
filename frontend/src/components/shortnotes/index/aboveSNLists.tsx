import { Button, Flex, Select, Spacer, Stack, VStack, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const aboveSNLists = () => {
    return (
        <Flex alignItems={"end"}>
            <Link to={"./newShortnote"}>
                <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                    New shortnote
                </Button>
            </Link>
            <Spacer />
            <Stack direction={"row"}>
                <VStack>
                    <Text alignSelf={"start"}>Sort by</Text>
                    <Select variant="filled" placeholder="None">
                        <option value="option1">Name</option>
                        <option value="option2">Date</option>
                    </Select>
                </VStack>
                <VStack>
                    <Text alignSelf={"start"}>Course</Text>
                    <Select variant="filled" placeholder="All">
                        <option value="option1">CSC218</option>
                        <option value="option2">CSC220</option>
                        <option value="option3">MTH110</option>
                    </Select>
                </VStack>
            </Stack>
        </Flex>
    )
}

export default aboveSNLists
