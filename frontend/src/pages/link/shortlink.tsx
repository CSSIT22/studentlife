import { Box, Button, Center, Heading, Link, StackDivider, VStack, Text, PopoverBody, PopoverHeader, PopoverContent, Popover, PopoverCloseButton, PopoverArrow, PopoverTrigger } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"


const shortlink = () => {
    const navigate = useNavigate()
    const customize = () => {
        navigate("/link/customize")
    }
    const generate = () => {
        navigate("/link/generate")
    }
    const history = () => {
        navigate("/link/history")
    }
    const customper = () => {
        navigate("/link/customper")
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"500px"} background={"white"} borderRadius="20px" marginTop={"10%"} textColor="white">
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"orange.200"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                        >
                            SHORTLINK FEATURE
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Box width={"100%"}>

                                <Center>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button bg={"#E65300"} w={"50%"} height={"60px"} textColor="white">
                                                <Text as={"b"}>SHORTLINK CUSTOMIZE</Text>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />

                                            <PopoverBody>
                                                <Button bg={"orange.600"} w={"100%"} mt={3} onClick={customize} textColor="white">
                                                    Customize Password
                                                </Button>

                                                <Button bg={"orange.600"} w={"100%"} mt={3} onClick={customper} textColor="white">
                                                    Customize Permission
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Center>

                            </Box>
                        </Box>
                        <Box h="70px">
                            <Center>

                                <Button bg={"#E65300"} w={"50%"} height={"60px"} textColor="white" onClick={generate}>
                                    <Text as={"b"}>SHORTLINK GENERATOR</Text>
                                </Button>

                            </Center>
                        </Box>
                        <Box h="70px">
                            <Link>
                                <Center>
                                    <Button bg={"#E65300"} w={"50%"} height={"60px"} onClick={history} textColor="white">
                                        <Text as={"b"}>SHORTLINK HISTORY</Text>
                                    </Button>
                                </Center>
                            </Link>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default shortlink
