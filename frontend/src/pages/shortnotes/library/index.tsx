import { Box, Button, Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"

const library = () => {
    return (
        <AppBody>
            <Flex justifyContent={"center"}>
                <Box rounded={8} padding={10} bg={"white"} w={"75%"}>
                    <SimpleGrid columns={3} gap={4}>
                        <Spacer />
                        <Heading size={"lg"} textAlign={"center"} mb={4}>
                            My library
                        </Heading>
                        <Link to={"./newLibrary"}>
                            <Flex justifyContent={"end"}>
                                <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                                    New library
                                </Button>
                            </Flex>
                        </Link>
                    </SimpleGrid>

                    <SimpleGrid columns={3} gap={4} textAlign={"center"} color={"white"}>
                        <Box bg={"orange.300"} p={10} rounded={4} boxShadow={"md"}>
                            <Heading size={"sm"}>library 1</Heading>
                        </Box>
                        <Box bg={"orange.300"} p={10} rounded={4} boxShadow={"md"}>
                            <Heading size={"sm"}>library 1</Heading>
                        </Box>

                        <Box bg={"orange.300"} p={10} rounded={4} boxShadow={"md"}>
                            <Heading size={"sm"}>library 1</Heading>
                        </Box>
                        <Box bg={"orange.300"} p={10} rounded={4} boxShadow={"md"}>
                            <Heading size={"sm"}>library 1</Heading>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Flex>
        </AppBody>
    )
}

export default library
