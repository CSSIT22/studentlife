import { Box, Button, Center, Heading,  useDisclosure, VStack, useToast, Editable } from "@chakra-ui/react"
import React, { useState } from "react"
import { Input } from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"

const customize = () => {
    const navigate = useNavigate()
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

    return (
        <AppBody>
            <Box>
                <Center>
                    {" "}
                    <Box width={{ base: '100%', sm: '70%', md: '50%', lg: '80%' }} height={"500px"} 
                    border={"4px"} 
                    borderColor={"orange"} background={"white"} borderRadius="20px" 
                    marginTop={"10%"} textColor="white" 
                    alignContent={"center"} >
                        <Box>
                            <Heading
                                width={{ base: "200px", md: "300px" }}
                                height={{ base: "2rem", md: "3rem" }}
                                marginLeft={"10%"}
                                marginTop={"-5"}
                                background={"white"}
                                borderRadius={"10px"}
                                fontSize={{ md: "xl", base: "md" }}
                                border={"3px solid orange"}
                                textAlign={"center"}
                                color={"orange"}
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
                                                w={"75%"} height={"3rem"}
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
                                                w={"75%"} height={"3rem"}
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
                                                w={"75%"} height={"3rem"}
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
                                                    w={"75%"} height={"3rem"}
                                                    border={"4px"} borderColor={"black"}
                                                    backgroundColor={"white"}
                                                    textColor="black" />
                                            </Center>
                                        </Box>)
                                    }
                                </VStack>
                                <Box h="70px" w={"100%"} marginTop={"2%"}>
                                    <Center>
                                        <Editable defaultValue='Take some chakra' w={"75%"} height={"3rem"} 
                                        border={"2px"} borderColor={"black"} rounded={"md"} backgroundColor={"orange"} 
                                        textColor="black" fontWeight={"bold"}>
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
