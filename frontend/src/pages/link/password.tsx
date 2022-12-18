import { Box, Button, Center, Heading, Link, StackDivider, VStack, Text, Input, InputGroup, InputRightElement, Alert, AlertIcon, Toast, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import { LockIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"



// const [show, setShow] = useState(false)
// const handleClick = () => setShow(!show)
const password = () => {
    const toast = useToast()
    const [pw1, setpw1] = useState("")
    const [pw2, setpw2] = useState("")
    const navigate = useNavigate()
    const complete = () => {
        navigate("/link/complete")
    }
    const shortlink = () => {
        navigate("/link/shortlink")
    }

    function onSend() {

        if (pw1 == "" && pw2 == "") {
            
            return (
                toast({
                    title: "Please fill the Password!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            )
        }
        else if (pw1 === pw2 && pw1 != "" && pw2 != "") {
          

            navigate("/link/complete")
        }
        else {
            console.log("3");

            return (
                toast({
                    title: "Password not match!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            )
        }
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={{ base: '100%', sm: '70%', md: '70%', lg: '70%', xl: '70%' }} height={"500px"} background={"white"} borderRadius="20px" marginTop={"10%"} >
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
                            textColor="white"
                        >
                            SHORTLINK PASSWORD
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Center >

                                <Input onChange={(e) => setpw1(e.target.value)} type={'password'} placeholder='Password:' w={'75%'} height={"60px"} border={"4px"} borderColor={"black"} backgroundColor={"white"} />


                            </Center>
                        </Box>
                        <Box h="70px">
                            <Center >
                                <Input onChange={(e) => setpw2(e.target.value)} type={'password'} placeholder='Confirm Password:' w={'75%'} height={"60px"} border={"4px"} borderColor={"black"} backgroundColor={"white"} />
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Link>
                                <Center>
                                    <Button bg={"green.400"} w={"75%"} height={"60px"} onClick={() => onSend()} >
                                        <Text as={"b"}>SAVE</Text>
                                    </Button>
                                </Center>
                            </Link>
                            <br />
                            <Box h="70px">
                                <Link>
                                    <Center>
                                        <Button bg={"orange.600"} w={"75%"} height={"60px"} onClick={shortlink}>
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
