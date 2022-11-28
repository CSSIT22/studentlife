import {
    Box,
    Button,
    Center,
    Heading,
    Link,
    Portal,
    StackDivider,
    useDisclosure,
    VStack,
    Text,
    ButtonGroup,
    useToast,
    Editable,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { Input } from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API from "src/function/API"

const generate = () => {
    const navigate = useNavigate()
    const password = () => {
        navigate("/link/password")
    }
    const unblock = () => {
        navigate("/link/unblock")
    }
    const permission = () => {
        navigate("/link/permission")
    }
    const complete = () => {
        navigate("/link/complete")
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()
    const [link, setLink] = useState("")
    const [generated, setGenerated] = useState("")
    const toast = useToast()

    const generateLink = async () => {
        const response = await API.post("http://localhost:8000/shortlink/generate", { originalLink: link }) //axios will call Http
        setGenerated(response.data.result.shortenLink)
        // console.log(response.data)
    }

    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"300px"} background={"orange.200"} borderRadius="20px" marginTop={"10%"}>
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
                            SHORTLINK GENERATOR
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <Input placeholder="link url:" w={"75%"} height={"60px"} border={"4px"} borderColor={"black"} onChange={(e) => setLink(e.target.value)} />
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px" w={"100%"}>
                            <Center>
                                <Editable
                                    w={"75%"}
                                    height={"60px"}
                                    border={"4px"}
                                    borderColor={"black"}
                                    rounded={"md"}
                                    alignItems = "center"
                                >{generated}</Editable>
                            </Center>
                        </Box>
                    </VStack>
                </Box>
            </Center>

            {/*  */}

            <Center>
                {" "}
                <Box width={"80%"} height={"200px"} background={"orange.200"} borderRadius="20px" marginTop={"1%"}>
                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            <Center>
                                <ButtonGroup gap={2}>
                                    <Button colorScheme="yellow" w={"100px"} height={"60px"} onClick={generateLink}>
                                        GENERATE
                                    </Button>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button colorScheme="purple" w={"100px"} height={"60px"}>
                                                ADD-ON
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>
                                                <Text as={"b"}>Select the Shortlink Add on!</Text>
                                            </PopoverHeader>
                                            <PopoverBody>
                                                <Button bg={"orange.200"} w={"100%"} mt={3} onClick={password}>
                                                    Shortlink Password
                                                </Button>
                                                <Button
                                                    bg={"pink.200"}
                                                    w={"100%"}
                                                    mt={3}
                                                    onClick={() =>
                                                        toast({
                                                            title: "Add Unblock features!",
                                                            description: "Unblock shortlink success",
                                                            status: "success",
                                                            duration: 3000,
                                                            isClosable: true,
                                                        })
                                                    }
                                                >
                                                    Shortlink Unblock
                                                </Button>
                                                <Button bg={"cyan.200"} w={"100%"} mt={3} onClick={permission}>
                                                    Shortlink Permission
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </ButtonGroup>
                            </Center>
                        </Box>

                        <Box h="70px">
                            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                            SAVE
                                        </AlertDialogHeader>

                                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button colorScheme="green" onClick={complete} ml={3}>
                                                SAVE
                                            </Button>
                                            <Button ref={cancelRef} onClick={onClose} ml={3}>
                                                Cancel
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                            <Box width={"100%"}>
                                <Center>
                                    <Button colorScheme="green" w={"50%"} height={"60px"} onClick={onOpen}>
                                        SAVE
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default generate
