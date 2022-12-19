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
import { motion } from "framer-motion"


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
    const history = () => {
        navigate("/link/history")
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()
    const [link, setLink] = useState("")
    const [generated, setGenerated] = useState("")
    const toast = useToast()

    const generateLink = async () => {
        const response = await API.post("/shortlink/generate", { originalLink: link }) //axios will call Http
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
                <Box width={"80%"} border={"4px"} 
                borderColor={"orange"} background={"white"} borderRadius="20px" 
                marginTop={"10%"} textColor="black">
                    <Box>
                        <Heading
                            width={{ base: "200px", md: "300px" }}
                            height={{ base: "2rem", md: "2rem" }}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"white"}
                            borderRadius={"10px"}
                            fontSize={{ base: "sm", md: "xl" }}
                            border={"3px solid orange"}
                            textAlign={"center"}
                            alignSelf={"center"}
                            color={"orange"}
                        >
                            SHORTLINK GENERATOR
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <Input placeholder="link url:"  w={"75%"} height={{ base: "40px", md: "60px" }}
                                        border={"4px"} borderColor={"black"}
                                        backgroundColor={"white"}
                                        textColor="black" onChange={(e) => setLink(e.target.value)}/>
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px" w={"100%"}>
                            <Center>
                                <Editable
                                     w={"75%"} height={"3rem"} 
                                     border={"2px"} borderColor={"black"} rounded={"md"} backgroundColor={"orange"} 
                                     textColor="black" fontWeight={"bold"}
                                >{generated != "" ? "https://ss.modlifes.me/" : ""}{generated}</Editable>
                            </Center>
                        </Box>
                        <Box width={"80%"} height={"200px"} background={"white"} borderRadius="20px" marginTop={"1%"}>
                    <VStack spacing={4} align="stretch" marginTop={"5%"} ml={"4em"}>
                        <Box h="70px">
                            <Center>
                            <motion.div whileHover={{ scale: 0.9 }}
                                                onHoverStart={e => { }}
                                                onHoverEnd={e => { }}>

                                <Button colorScheme="blue" w={"100%"} height={"60px"} onClick={generateLink} textColor="white" disabled={link.length === 0}>
                                    GENERATE
                                </Button></motion.div>
                            </Center>
                        </Box>

                        <Box h="70px">

                            <Box width={"100%"}>
                                <Center>
                                <motion.div whileHover={{ scale: 0.9 }}
                                                onHoverStart={e => { }}
                                                onHoverEnd={e => { }}>
                                    <Button colorScheme="green" w={"100%"} height={"60px"} onClick={history}>
                                        Go to Shortlink History
                                    </Button></motion.div>
                                </Center>
                            </Box>
                        </Box>
                    </VStack>
                </Box>
                    </VStack>

                </Box>
                
            </Center>

            {/*  */}

            
        
        </AppBody>
    )
}
export default generate
