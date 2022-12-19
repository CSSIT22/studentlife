import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack, Text, useToast, Editable, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
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
import { motion } from "framer-motion"
import { extendTheme } from '@chakra-ui/react'


const SearchUserList = React.lazy(() => import("src/components/shortlink/SearchUserList"))

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
    const [permissionUser, setPermissionUser] = useState<any>([]);
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
            //TODO: Check if password and coonfirm password is same
            const response = await API.post("/shortlink/custom", { originalLink: shortUrlData.link, shortenLink: shortUrlData.word, password: shortUrlData.password, userAccessIds: permissionUser.map((i: any) => i.id) })
            setShortedUrl(response.data.result.shortenLink)

            navigate("/link/history")
        } else {
            return toast({
                title: "Password not match!",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }

    }

    const addNewPermession = useCallback((props: {
        id: string;
        userName: string;
        lastName: string;
    }) => {
        if (!!(permissionUser.find((sUser: { id: string }) => props.id === (sUser.id)))) { //Check if user already have a permission
            setPermissionUser(permissionUser.filter((item: { id: string }) => item.id !== props.id)); //remove user from permission state
        } else {
            setPermissionUser((prev: any) => [...prev, props])
        }
    }, [permissionUser])

    // ---------------------------
    const [userData, setUserData] = useState<any>()

    const fetch = async () => {
        const res = await API.get(`/shortlink/getUser`);
        setUserData([...res.data.users]);
    }

    const didFetchRef = useRef(false)
    useEffect(() => {
        if (didFetchRef.current) return

        fetch();

        return () => {
            didFetchRef.current = true;
        }
    }, [])


    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure()
    const btnUse = React.useRef(null)



    return (
        <AppBody>
            <Center>
                <Box width={"80%"} borderColor={"white"} border={"2px"}
                    background={"linear-gradient(117deg, rgba(255,234,0,1) 0%, rgba(255,152,0,1) 99%)"}
                    borderRadius="20px" marginTop={"10%"} textColor="white">
                    <Box>
                        <Heading
                            width={{ base: "200px", md: "300px" }}
                            height={{ base: "50px", md: "60px" }}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"linear-gradient(180deg, rgba(255,130,0,1) 0%, rgba(255,177,0,1) 100%)"}
                            borderRadius={"10px"}
                            fontSize={{ base: "sm", md: "xl" }}
                            border={"3px solid white"}
                            textAlign={"center"}
                            alignSelf={"center"}
                        >
                            SHORTLINK  CUSTOMIZE (PERMISSION)
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <VStack gap="1%">
                            <Box width={"100%"}>
                                <Center>
                                    <Input
                                        name="link"
                                        placeholder="Link URL*:"
                                        onChange={handleChange}
                                        w={"75%"} height={{ base: "40px", md: "60px" }}
                                        border={{ base: "2px", md: "4px" }} borderColor={"black"}
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
                                        w={"75%"} height={{ base: "40px", md: "60px" }}
                                        border={{ base: "2px", md: "4px" }} borderColor={"black"}
                                        backgroundColor={"white"}
                                        textColor="black" />
                                </Center>
                            </Box>


                        </VStack>

                        <VStack gap="1%">

                            <Box h="70px" w={"100%"} marginTop={"2%"}>
                                <Center>
                                    <Editable defaultValue='Take some chakra' w={"75%"} height={{ base: "45px", md: "60px" }}
                                        border={"4px"} borderColor={"black"} rounded={"md"} backgroundColor={"white"} textColor="black">
                                        <a>
                                            {shortUrlData.word &&
                                                "https://ss.modlifes.me/" + (shortUrlData.word != "" ? shortUrlData.word : shortedUrl)}
                                        </a>
                                    </Editable>
                                </Center>
                            </Box>

                            {permissionUser.length > 0 &&
                                <HStack wrap="wrap" rowGap="12px" justifyContent="center">
                                    {
                                        permissionUser.map((data: { id: string; userName: string; lastName: string }) => (
                                            <Box style={{ backgroundColor: "#ffe492" ,color:"black",}} padding="2" borderRadius="full" key={data.id}>
                                                <Text fontSize='xs' fontWeight={"bold"}>
                                                    {data.userName} {data.lastName}
                                                </Text>
                                            </Box>
                                        ))
                                    }
                                </HStack>
                            }

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
                                                <React.Suspense fallback={<>Loading...</>} >
                                                    <SearchUserList handleSelect={addNewPermession} selectedUser={permissionUser} userData={userData} />
                                                </React.Suspense>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button onClick={onListClose} bg={"green.400"}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Center>
                            </Box>

                            < Box h="70px" w={"100%"} marginTop={"2%"}>
                                <Center>
                                    {/* onClick={onOpen} */}
                                    <motion.div whileHover={{ scale: 0.9 }}
                                        onHoverStart={e => { }}
                                        onHoverEnd={e => { }}>
                                        <Button colorScheme="green" w={"5rem"} height={"60px"} onClick={generateLink} disabled={shortUrlData.link.length === 0}>
                                            SAVE
                                        </Button></motion.div>
                                </Center>
                            </Box>
                        </VStack>
                    </VStack>
                </Box>
            </Center>

            {/*  */}


        </AppBody >
    )
}
export default customize
