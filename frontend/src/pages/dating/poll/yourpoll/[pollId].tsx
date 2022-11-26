import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DatingYourPollCancel from "src/components/dating/DatingYourPollCancel"
import DatingYourPollClose from "src/components/dating/DatingYourPollClose"
import DatingYourPollCloseAndAcceptAll from "src/components/dating/DatingYourPollCloseAndAcceptAll"
import DatingYourPollSeeMore from "src/components/dating/DatingYourPollSeeMore"
import API from "src/function/API"
import DatingAppBody from "../../../../components/dating/DatingAppBody"
import ChatImg from "../../../../components/dating/pic/chat.png"
import CheckImg from "../../../../components/dating/pic/check.png"
import { POLL } from "../../../../components/dating/shared/poll"
// import POLL_APPLICANT from "../../../../components/dating/shared/poll_applicant"

const YourPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    useEffect(() => {
        if (didMount) {
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions").then((datingOptions) => {
                    if (!datingEnroll.data.hasCompleteSetting) {
                        navigate("/dating/interests")
                        if (!datingOptions.data.userId) {
                            // navigate("/dating/option")
                            if (!datingEnroll.data.hasCompleteTutorial) {
                                navigate("/dating/tutorial")
                            }
                        }
                    }
                })
            })
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    const { pollId } = useParams()
    const pollInfo = POLL[POLL.findIndex((e) => e.pollId == pollId)]

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
                            {pollInfo.pollName}
                        </Text>
                    </Box>
                    <DatingYourPollSeeMore pollInfo={pollInfo} />
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
                                    <DatingYourPollClose />
                                    <DatingYourPollCloseAndAcceptAll />
                                </Box>
                                <DatingYourPollCancel />
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
