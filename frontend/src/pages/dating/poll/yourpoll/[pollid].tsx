import { Box, Button, Container, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import DatingAppBody from "../../../../components/dating/DatingAppBody"
import ChatImg from "../../../../components/dating/pic/chat.png"
import CheckImg from "../../../../components/dating/pic/check.png"

const YourPoll = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function handleBottomBar() {
        let bottomBar = document.getElementById("bottomBar") as HTMLInputElement
        if (bottomBar) {
            if (bottomBar.style.display == "none") {
                bottomBar.style.display = "initial"
            } else {
                bottomBar.style.display = "none"
            }
        }
    }

    return (
        <>
            <DatingAppBody>
                <Box
                    w="100%"
                    minHeight={{ base: "95px", md: "129px" }}
                    backgroundColor="white"
                    boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    mb={{ base: "40px", md: "50px" }}
                    borderRadius="10px"
                    mt="40px"
                >
                    <Box h="90%" mb="35px">
                        <Text pt="17px" pl="31px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                            Poll Header
                        </Text>
                    </Box>
                    <Box h="10%" display="flex" justifyContent="end" alignItems="end">
                        <Text
                            pb="17px"
                            pr="31px"
                            fontWeight="400"
                            fontSize={{ base: "14px", md: "16px" }}
                            lineHeight="150%"
                            textDecorationLine="underline"
                            color="black"
                            cursor="pointer"
                        >
                            Click to see more
                        </Text>
                    </Box>
                </Box>
                <Heading
                    color="black"
                    ml={{ base: "10px", md: "0px" }}
                    pb={{ base: "16px", md: "24px" }}
                    fontWeight="700"
                    fontSize={{ base: "25px", md: "26px" }}
                    lineHeight="150%"
                >
                    People interested in joining your activity
                </Heading>
                <Box
                    w="100%"
                    height={{ base: "90px", md: "100px" }}
                    backgroundColor="white"
                    boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    borderRadius="10px"
                    mb={{ base: "8px", md: "12px" }}
                    display="flex"
                >
                    <Box display="flex" alignItems="center" ml={{ base: "20px", md: "24px" }} w="65%">
                        <Image
                            borderRadius="full"
                            boxSize={{ base: "50px", md: "78px" }}
                            objectFit="cover"
                            src="https://0.soompi.io/wp-content/uploads/2022/05/01080609/J-Hope2.jpg"
                        />
                        {isMobile ? (
                            <Text ml="24px" fontWeight="700" fontSize="24px" lineHeight="133%" color="black">
                                Firstname Lastname
                            </Text>
                        ) : (
                            <Text ml="12px" fontWeight="700" fontSize="16px" lineHeight="133%" color="black">
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
                            <Image src={CheckImg} />
                        </Button>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        >
                            <Image src={ChatImg} />
                        </Button>
                    </Box>
                </Box>
                <Box
                    w="100%"
                    height={{ base: "90px", md: "100px" }}
                    backgroundColor="white"
                    boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    borderRadius="10px"
                    mb={{ base: "8px", md: "12px" }}
                    display="flex"
                >
                    <Box display="flex" alignItems="center" ml={{ base: "20px", md: "24px" }} w="65%">
                        <Image
                            borderRadius="full"
                            boxSize={{ base: "50px", md: "78px" }}
                            objectFit="cover"
                            src="https://0.soompi.io/wp-content/uploads/2022/05/01080609/J-Hope2.jpg"
                        />
                        {isMobile ? (
                            <Text ml="24px" fontWeight="700" fontSize="24px" lineHeight="133%" color="black">
                                Firstname Lastname
                            </Text>
                        ) : (
                            <Text ml="12px" fontWeight="700" fontSize="16px" lineHeight="133%" color="black">
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
                            <Image src={CheckImg} />
                        </Button>
                        <Button
                            borderRadius="full"
                            w={{ base: "50px", md: "72px" }}
                            h={{ base: "50px", md: "72px" }}
                            backgroundColor="white"
                            border="1px solid"
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        >
                            <Image src={ChatImg} />
                        </Button>
                    </Box>
                </Box>
                <Box mb="275px" />
            </DatingAppBody>
            <Box zIndex="2" position="fixed" w="100%" justifyContent="space-between" bottom={0} id="bottomBar">
                <Container w="container.lg" maxW={"100%"}>
                    <Box
                        maxW="100%"
                        bg="white"
                        pt={{ base: "10px", md: "7px" }}
                        borderTopRadius={{ base: "10px", md: "15px" }}
                        backgroundColor="orange.300"
                    >
                        <Box display="flex" justifyContent="center" cursor="pointer" onClick={handleBottomBar}>
                            <Box
                                w={{ base: "84px", md: "232px" }}
                                h={{ base: "3px", md: "5px" }}
                                mb={{ base: "20px", md: "27px" }}
                                backgroundColor="white"
                                borderRadius="15px"
                            />
                        </Box>

                        <Box>
                            <Box>
                                <Text
                                    fontWeight="700"
                                    fontSize="20px"
                                    lineHeight="120%"
                                    color="white"
                                    textAlign="center"
                                    pl={{ base: "35px", md: "0" }}
                                    pr={{ base: "35px", md: "0" }}
                                >
                                    Now, 2 people are interested in joining your activity.
                                </Text>
                                <Text
                                    fontWeight="700"
                                    fontSize="20px"
                                    lineHeight="120%"
                                    color="white"
                                    textAlign="center"
                                    pl={{ base: "35px", md: "0" }}
                                    pr={{ base: "35px", md: "0" }}
                                >
                                    Do you want to close the poll?
                                </Text>
                                <Box display="flex" justifyContent="center" pt={"30px"}>
                                    <Button
                                        colorScheme="orange"
                                        w={{ base: "167px", md: "172px" }}
                                        h="36px"
                                        mr={{ base: "5px", md: "47px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Text fontWeight="700" fontSize="14px" lineHeight="120%" color="white">
                                            Close now
                                        </Text>
                                    </Button>
                                    <Button
                                        colorScheme="orange"
                                        w={{ base: "167px", md: "172px" }}
                                        h="36px"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Text fontWeight="700" fontSize="14px" lineHeight="120%" color="white">
                                            Close & accept all
                                        </Text>
                                    </Button>
                                </Box>
                                <Box display="flex" justifyContent="center" pt={{ base: "5px", md: "20px" }} pb={{ base: "80px", md: "25px" }}>
                                    <Button
                                        colorScheme="orange"
                                        w={{ base: "167px", md: "380px" }}
                                        h="36px"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Text fontWeight="700" fontSize="14px" lineHeight="120%" color="white">
                                            Cancel the activity
                                        </Text>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box zIndex="1" position="fixed" w="100%" justifyContent="space-between" bottom={0} id="bottomBarHidden">
                <Container w="container.lg" maxW={"100%"}>
                    <Box
                        maxW="100%"
                        bg="white"
                        pt={{ base: "10px", md: "7px" }}
                        borderTopRadius={{ base: "10px", md: "15px" }}
                        backgroundColor="orange.300"
                    >
                        <Box display="flex" justifyContent="center" cursor="pointer" onClick={handleBottomBar}>
                            <Box
                                w={{ base: "84px", md: "232px" }}
                                h={{ base: "3px", md: "5px" }}
                                mb={{ base: "20px", md: "27px" }}
                                backgroundColor="white"
                                borderRadius="15px"
                            />

                            <Box mb={{ base: "100px", md: "30px" }} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default YourPoll
