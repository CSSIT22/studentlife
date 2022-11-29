import { HStack, Box, Center, useToast, Button, Text, Image, useBreakpointValue, Flex, Spacer, Grid, ButtonGroup } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import API from "src/function/API"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import ChatImg from "../../../components/dating/pic/chat.png"
import GroupChatImg from "../../../components/dating/pic/groupchat.png"


const YourAppliedActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1
    useEffect(() => {
        if (didMount && count != 0) {
            count--
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions")
                    .then((datingOptions) => {
                        if (!datingEnroll.data.hasCompleteTutorial) {
                            toast({
                                title: "Welcome!",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend."
                            })
                            navigate("/dating/tutorial");
                        }
                        else if (!datingOptions.data.userId) {
                            navigate("/dating/option")
                            toast({
                                title: "Option Setting Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to set your option first before using Dating & Finding Friend."
                            })
                        }
                        else if (!datingEnroll.data.hasCompleteSetting) {
                            toast({
                                title: "Interests Selection Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to skip or select your interests first before using Dating & Finding Friend."
                            })
                            navigate("/dating/interests")
                        }

                    })
            })
        }
    })

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }
    return (
        <DatingAppBody>
            <Center>
                <Box
                    mt={{ base: "-20px", md: "7px" }}
                    pr="500px"
                    pl="500px"
                    pt={{ base: "-20px", md: "20px" }}
                    zIndex="4"
                    pb="30px"
                    position="fixed"
                    top={{ base: 20, md: 150 }}
                    justifyContent="center"
                    bg="#FFF2E5"
                >
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" justifyContent="center" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.800"} />
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.600"} />
                    </HStack>
                </Box>
            </Center>

            {/* 1
            <Box
                w="100%"
                minHeight={{ base: "95px", md: "129px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                mb={{ base: "8px", md: "25px" }}
                borderRadius="10px"
                mt="130px"
            >
                <Box h="90%" mb="35px">
                    <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                        Poll Header
                    </Text>
                    {isMobile ? (
                        <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                            Firstname Lastname
                        </Text>
                    ) : (
                        <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                            Firstname L.
                        </Text>
                    )}
                </Box>
                <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                    <Button
                        borderRadius="full"
                        w={{ base: "50px", md: "72px" }}
                        h={{ base: "50px", md: "72px" }}
                        backgroundColor="white"
                        border="1px solid"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                        <Image src={ChatImg} />
                    </Button>
                </Box>
            </Box>

            {/* 2 */}
            {/* <Box
                w="100%"
                minHeight={{ base: "95px", md: "129px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                mb={{ base: "8px", md: "25px" }}
                borderRadius="10px"
            // mt="130px"
            >
                <Box h="90%" mb="35px" alignItems="center" w="65%">
                    <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                        Poll Header
                    </Text>
                    {isMobile ? (
                        <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                            Firstname Lastname
                        </Text>
                    ) : (
                        <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                            Firstname L.
                        </Text>
                    )}
                    <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                            <Image src={ChatImg} />
                        </Button>
                    </Box>
                </Box>
            </Box> */}

            {/* 3 */}
            {/* <Box w="100%"
                height={{ base: "90px", md: "100px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}
                mt="135px"
                display="flex">

                <Box h="90%" mb="35px">
                    <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                        Poll Header
                    </Text>
                    {isMobile ? (
                        <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                            Firstname Lastname
                        </Text>
                    ) : (
                        <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                            Firstname L.
                        </Text>
                    )}
                </Box>
                <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                    <Button
                        borderRadius="full"
                        w={{ base: "50px", md: "72px" }}
                        h={{ base: "50px", md: "72px" }}
                        backgroundColor="white"
                        border="1px solid"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                        <Image src={ChatImg} />
                    </Button>
                </Box>
            </Box> */}

            {/* 3 1*/}
            {/* <Box w="100%"
                height={{ base: "90px", md: "100px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}
            display="flex"
            > */}
{/* 
                <Flex>
                    <Box>
                        <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                            Poll Header
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text mt="15px" mr="30" lineHeight="133%" color="black" fontSize="15px">
                            Your Poll Status
                        </Text>
                    </Box>
                </Flex>

                <Grid alignItems='center' templateColumns='repeat(2, 1fr)' gap={6}>
                    <Box pt='6' pb='6'>
                        <Text ml="30px" fontSize="20px" lineHeight="133%" color="black">
                            Firstname Lastname
                        </Text>
                    </Box>
                    <Flex>
                        <Box>
                            <Text mt="20px" lineHeight="133%" color="black" fontSize="15px" >
                                Click to see more
                            </Text>
                        </Box>
                        <Spacer />
                        <ButtonGroup gap='2'>
                            <Button colorScheme='teal'>Chat</Button>
                        </ButtonGroup>
                    </Flex>
                </Grid>
            </Box> */}

            {/* 4 */}
            {/* <Box w="100%"
                height={{ base: "90px", md: "100px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}
                display="flex"
            >

                <Box h="90%" mb="35px">
                    <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                        Poll Header
                    </Text>
                    {isMobile ? (
                        <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                            Firstname Lastname
                        </Text>
                    ) : (
                        <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                            Firstname L.
                        </Text>
                    )}
                </Box>
                <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                    <Button
                        borderRadius="full"
                        w={{ base: "50px", md: "72px" }}
                        h={{ base: "50px", md: "72px" }}
                        backgroundColor="white"
                        border="1px solid"
                        mr={{ base: "12px", md: "24px" }}
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    >
                        <Image src={GroupChatImg} />
                    </Button>
                    <Button
                        borderRadius="full"
                        w={{ base: "50px", md: "72px" }}
                        h={{ base: "50px", md: "72px" }}
                        backgroundColor="white"
                        border="1px solid"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                        <Image src={ChatImg} />
                    </Button>
                </Box>
            </Box> */}

            {/* Test */}
            {/* <Box backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}

            >
                <Flex>
                    <Box>
                        <Text pt="17px" pl="30px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                            Poll Header
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text mt="15px" mr="30px" lineHeight="133%" color="black" fontSize="15px">
                            Your Poll Status
                        </Text>
                    </Box>
                </Flex>

                <Grid alignItems='center' templateColumns='repeat(2, 1fr)' gap={6}>
                    <Box pt='6' pb='6'>
                        {isMobile ? (
                            <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                                Firstname Lastname
                            </Text>
                        ) : (
                            <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                                Firstname L.
                            </Text>
                        )}
                    </Box>
                    <Flex>
                        <Box>
                            <Text mt="20px" lineHeight="133%" color="black" fontSize="15px" >
                                Click to see more
                            </Text>
                        </Box>
                        <Spacer />
                        <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                            <Button
                                borderRadius="full"
                                w={{ base: "50px", md: "72px" }}
                                h={{ base: "50px", md: "72px" }}
                                backgroundColor="white"
                                border="1px solid"
                                mr={{ base: "12px", md: "24px" }}
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                            >
                                <Image src={GroupChatImg} />
                            </Button>
                            <Button
                                borderRadius="full"
                                w={{ base: "50px", md: "72px" }}
                                h={{ base: "50px", md: "72px" }}
                                backgroundColor="white"
                                border="1px solid"
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                                <Image src={ChatImg} />
                            </Button>
                        </Box> */}

                        {/* <ButtonGroup gap='2' mr="30px">
                            <Button
                                borderRadius="full"
                                w={{ base: "50px", md: "72px" }}
                                h={{ base: "50px", md: "72px" }}
                                backgroundColor="white"
                                border="1px solid"
                                mr={{ base: "12px", md: "24px" }}
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                            >
                                <Image src={GroupChatImg} />
                            </Button>
                            <Button
                                borderRadius="full"
                                w={{ base: "50px", md: "72px" }}
                                h={{ base: "50px", md: "72px" }}
                                backgroundColor="white"
                                border="1px solid"
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                                <Image src={ChatImg} />
                            </Button>
                        </ButtonGroup> */}
                    {/* </Flex>
                </Grid>
            </Box> */}

            {/* Test 1*/}
            <Box backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}
                mt="135px"
            >
                <Flex>
                    <Box>
                        <Text pt="17px" pl="30px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                            Poll Header
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text mt="15px" mr="30px" lineHeight="133%" color="black" fontSize="15px">
                            Your Poll Status
                        </Text>
                    </Box>
                </Flex>

                <Flex>
                    <Box pt='6' pb='6'>
                        {isMobile ? (
                            <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                                Firstname Lastname
                            </Text>
                        ) : (
                            <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                                Firstname L.
                            </Text>
                        )}
                    </Box>
                    <Spacer />
                    <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                            <Image src={ChatImg} />
                        </Button>
                    </Box>
                </Flex>

                <Box >
                    <Center>
                        <Text lineHeight="133%" color="black" fontSize="15px" as='u' mb="20px">
                            Click to see more
                        </Text>
                    </Center>
                </Box>
            </Box>

            {/* Test 2*/}
            <Box backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "25px" }}

            >
                <Flex>
                    <Box>
                        <Text pt="17px" pl="30px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                            Poll Header
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text mt="15px" mr="30px" lineHeight="133%" color="black" fontSize="15px">
                            Your Poll Status
                        </Text>
                    </Box>
                </Flex>

                <Flex>
                    <Box pt='6' pb='6'>
                        {isMobile ? (
                            <Text ml="30px" fontWeight="700" fontSize="20px" lineHeight="133%" color="black">
                                Firstname Lastname
                            </Text>
                        ) : (
                            <Text ml="30px" fontSize="16px" lineHeight="133%" color="black">
                                Firstname L.
                            </Text>
                        )}
                    </Box>
                    <Spacer />
                    <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            mr={{ base: "12px", md: "24px" }}
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        >
                            <Image src={GroupChatImg} />
                        </Button>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                            <Image src={ChatImg} />
                        </Button>
                    </Box>
                </Flex>

                <Box >
                    <Center>
                        <Text lineHeight="133%" color="black" fontSize="15px" as='u' mb="20px">
                            Click to see more
                        </Text>
                    </Center>
                </Box>
            </Box>

        </DatingAppBody>
    )
}

export default YourAppliedActivityPoll