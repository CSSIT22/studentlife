import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack, Text, useToast, Editable, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
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
import API from "src/function/API"
import SearchUserList from "src/components/shortlink/SearchUserList"

const customize = () => {
    const navigate = useNavigate()
    const password = () => {
        navigate("/link/password")
    }
    const history = () => {
        navigate("/link/history")
    }
    const permission = () => {
        navigate("/link/permission")
    }
    const complete = () => {
        navigate("/link/complete")
    }
    const toast = useToast()
    // ---------------------------
    const [shortUrlData, setShortUrlData] = useState(
        {
            link: "",
            word: "",
            password: "",
            confirmPassword: ""
        }
    );
    const [shortedUrl, setShortedUrl] = useState("");
    // const [custom, setcustom] = useState("");
    // const [word, setword] = useState("");
    // const [link, setLink] = useState("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: { name: string; value: string } = e.currentTarget;
        setShortUrlData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const generateLink = async () => {
        if (!shortUrlData.link || !shortUrlData.word) {

        }

        if (shortUrlData.password === shortUrlData.confirmPassword) {
            navigate("/link/history")
        } else {
            return toast({
                title: "Password not match!",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }

        //TODO: Check if password and coonfirm password is same
        const response = await API.post("http://localhost:8000/shortlink/custom", { originalLink: shortUrlData.link, shortenLink: shortUrlData.word, password: shortUrlData.password })
        setShortedUrl(response.data.result.shortenLink)
    }

    // ---------------------------



    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure()
    const btnUse = React.useRef(null)

    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={shortUrlData.password.length > 0 ? "450px" : "400px"} background={"white"} borderRadius="20px" marginTop={"10%"} textColor="white">
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
                            SHORTLINK  CUSTOMIZE (PERMISSION)
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="100px">
                            <VStack gap="1%">
                                <Box width={"100%"}>
                                    <Center>
                                        <Input
                                            name="link"
                                            placeholder="Link URL*:"
                                            onChange={handleChange}
                                            w={"75%"} height={"60px"}
                                            border={"4px"} borderColor={"black"}
                                            backgroundColor={"white"}
                                            textColor="black" />
                                    </Center>
                                </Box>
                                <Box width={"100%"}>
                                    {/* custom word */}
                                    {/* handle change */}
                                    <Center>
                                        <Input
                                            name="word"
                                            placeholder="Custom Word*:"
                                            onChange={handleChange}
                                            w={"75%"} height={"60px"}
                                            border={"4px"} borderColor={"black"}
                                            backgroundColor={"white"}
                                            textColor="black" />
                                    </Center>
                                </Box>
                               
                                
                            </VStack>

                            <VStack gap="1%">

                            <Box h="70px" w={"100%"} marginTop={"2%"}>
                                <Center>
                                    <Editable defaultValue='Take some chakra' w={"75%"} height={"60px"} border={"4px"} borderColor={"black"} rounded={"md"} backgroundColor={"white"} textColor="black">
                                        <a>
                                            {shortUrlData.word &&
                                                "http://localhost:8000/shortlink/redirect?shorten=" + (shortUrlData.word != "" ? shortUrlData.word : shortedUrl)}
                                        </a>
                                    </Editable>
                                </Center>
                            </Box>

                            <Box>
                                <Center>
                                    <Button bg={"orange.600"} w={"100%"} height={"60px"} onClick={onListOpen}>
                                                <Text as={"b"}>Add people to access your link!</Text>
                                            </Button>
                                            <Modal onClose={onListClose} finalFocusRef={btnUse} isOpen={isListOpen}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Select user(s) to access your link!</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody rounded="xl">
                                                        <SearchUserList/>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={complete} bg={"green.400"}>
                                                               Close
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                </Center>
                            </Box>

                            </VStack>
                           

                        </Box>


                    </VStack>
                </Box>
            </Center>

            {/*  */}

            <Center>
                {" "}
                <Box width={"80%"} height={"200px"} background={"white"} borderRadius="20px" marginTop={"1%"}>
                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            
                            <Box width={"100%"}>
                                <Center>
                                    {/* onClick={onOpen} */}
                                    <Button colorScheme="green" w={"50%"} height={"60px"} onClick={generateLink} disabled={shortUrlData.link.length === 0}>
                                        SAVE
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button colorScheme="orange" w={"50%"} height={"60px"}>
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
                                            <Button bg={"orange.600"} w={"100%"} mt={3} onClick={password} textColor="white">
                                                Shortlink Password
                                            </Button>
                                            {/* <Button bg={"orange.600"} w={"100%"} mt={3} textColor="white"
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
                                            </Button> */}
                                            <Button bg={"orange.600"} w={"100%"} mt={3} onClick={permission} textColor="white">
                                                Shortlink Permission
                                            </Button>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Center>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default customize
