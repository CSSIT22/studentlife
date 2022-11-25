import { Box, Button, Center, Heading, Link, StackDivider, VStack, Text, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import { LockIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
}

// const [show, setShow] = useState(false)
// const handleClick = () => setShow(!show)
const password = () => {
    const navigate = useNavigate()
    const complete = () => {
        navigate("/link/complete")
    }
    const shortlink = () => {
        navigate("/link/shortlink")
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box
                    width={{ base: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" }}
                    height={"500px"}
                    background={"#D9D9D9"}
                    borderRadius="20px"
                    marginTop={"10%"}
                >
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"#f2f2f2"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                        >
                            SHORTLINK PASSWORD
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Center>
                                <Input
                                    type={"password"}
                                    placeholder="Create Password:"
                                    w={"75%"}
                                    height={"60px"}
                                    border={"4px"}
                                    borderColor={"black"}
                                />
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input
                                    type={"password"}
                                    placeholder="Confirm Password:"
                                    w={"75%"}
                                    height={"60px"}
                                    border={"4px"}
                                    borderColor={"black"}
                                />
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Link>
                                <Center>
                                    <Button bg={"orange.200"} w={"75%"} height={"60px"} onClick={complete}>
                                        <Text as={"b"}>SAVE</Text>
                                    </Button>
                                </Center>
                            </Link>
                            <br />
                            <Box h="70px">
                                <Link>
                                    <Center>
                                        <Button bg={"orange.200"} w={"75%"} height={"60px"} onClick={shortlink}>
                                            <Text as={"b"}>Back</Text>
                                        </Button>
                                    </Center>
                                </Link>
                            </Box>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default password
