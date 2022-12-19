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

    // handle save change
    const generateLink = async () => {
        // if link or word is empty do nothing
        if (!shortUrlData.link || !shortUrlData.word) {
            return;
        }

        // password from both input tag are the same then navigate to /link/history
        if (shortUrlData.password === shortUrlData.confirmPassword) {
            // send data to database
            const response = await API.post("/shortlink/custom", { originalLink: shortUrlData.link, shortenLink: shortUrlData.word, password: shortUrlData.password })
            setShortedUrl(response.data.result.shortenLink) // set shortenlink generated from server

            navigate("/link/history")
        } else {
            // if password doesn't equal to each other then render a toast (toast = popup)
            return toast({
                title: "Password not match!",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
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
            <Box>
                <Center>
                    {" "}
                    <Box width={{ base: '100%', sm: '70%', md: '50%', lg: '30%', xl: '30%' }} height={"500px"} background={"white"} borderRadius="20px" alignSelf={"center"} alignItems={"center"} alignContent={"center"} marginTop={"10%"} >
                        <Box>
                            <Heading
                                width={{base:'300px', sm: '70%', md: '70%', lg: '70%', xl: '70%'}}
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
                                                    name="confirmPassword"
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
                                                {shortUrlData.word &&
                                                    "https://ss.modlifes.me/" + (shortUrlData.word != "" ? shortUrlData.word : shortedUrl)}
                                            </a>
                                        </Editable>
                                    </Center>
                                </Box>
                                <Box width={"100%"} marginTop={"5%"}>
                                    <Center>
                                        {/* onClick={onOpen} */}
                                        {/* onClick of this button (save button) called function named generateLink */}
                                        {/* isDisable: the save button is set to disable (cannot press) if one of link or word is not filled */}
                                        <Button isDisabled={!shortUrlData.link || !shortUrlData.word} colorScheme="green" w={"50%"} height={"60px"} onClick={generateLink}>
                                            SAVE
                                        </Button>
                                    </Center>
                                </Box>
                            </Box>
                        </VStack>
                    </Box>
                </Center>
            </Box>
        </AppBody>
    )
}
export default customize
