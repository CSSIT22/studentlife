import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack, Text, useToast, Editable, HStack } from "@chakra-ui/react"
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

const customize = () => {
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
        if (!(shortUrlData.password == shortUrlData.confirmPassword)) {
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
                            SHORTLINK CUSTOMIZE
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
                                <Box width={"100%"}>
                                    {/* custom password */}
                                    {/* handle change */}
                                    <Center>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Password (Optional):"
                                            onChange={handleChange}
                                            w={"75%"} height={"60px"}
                                            border={"4px"} borderColor={"black"}
                                            backgroundColor={"white"}
                                            textColor="black" />
                                    </Center>
                                </Box>
                                {
                                    shortUrlData.password.length > 0 &&
                                    (<Box width={"100%"}>
                                        <Center>
                                            <Input
                                                type="password"
                                                name="confirm-password"
                                                placeholder="Confirm Password*:"
                                                onChange={handleChange}
                                                w={"75%"} height={"60px"}
                                                border={"4px"} borderColor={"black"}
                                                backgroundColor={"white"}
                                                textColor="black" />
                                        </Center>
                                    </Box>)
                                }
                            </VStack>
                            <Box h="70px" w={"100%"} marginTop={"2%"}>
                                <Center>
                                    <Editable defaultValue='Take some chakra' w={"75%"} height={"60px"} border={"4px"} borderColor={"black"} rounded={"md"} backgroundColor={"white"} textColor="black">
                                        <a>
                                            {shortedUrl != "" &&
                                                "http://localhost:8000/shortlink/redirect?shorten=" + (shortUrlData.word != "" ? shortUrlData.word : shortedUrl)}
                                        </a>
                                    </Editable>
                                </Center>
                            </Box>
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
                            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                            SAVE
                                        </AlertDialogHeader>

                                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button colorScheme='green' onClick={complete} ml={3}>
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
