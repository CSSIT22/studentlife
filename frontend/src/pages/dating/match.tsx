import { Box, Button, GridItem, Heading, useBreakpointValue, useToast , Image,Text} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
import DatingAppBody from "../../components/dating/DatingAppBody"
import ChatImg from "../../components/dating/pic/chat.png"
import { POLL } from "src/components/dating/shared/poll"

const DatingMatch = () => {
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


    return <>
        <DatingAppBody>
            <Box>
                {/* // Big Heading */}
                <GridItem pt="5" pl="2" area={"topic"}>
                    <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                        You are match with
                    </Heading>
                </GridItem>
            </Box>

            <Box w="100%"
                height={{ base: "90px", md: "100px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mt="25px"
                mb={{ base: "8px", md: "12px" }}
                display="flex">
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
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                        <Image src={ChatImg} />
                    </Button>
                </Box>
            </Box>

            <Box w="100%"
                height={{ base: "90px", md: "100px" }}
                backgroundColor="white"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                mb={{ base: "8px", md: "12px" }}
                display="flex">
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
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                        <Image src={ChatImg} />
                    </Button>
                </Box>
            </Box>


        </DatingAppBody> </>
}

export default DatingMatch
