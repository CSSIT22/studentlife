import { Box, Center, Container, Flex, HStack, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityBox from "src/components/dating/DatingAllActivityBox"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import API from "src/function/API"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const AllActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1;

    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
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

    return (
        <DatingAppBody>
            {/* Combine all Nav buttons */}
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
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.600"} />
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.800"} />
                    </HStack>
                </Box>
            </Center>
            {/* Calling all activity poll out (Need to order by time)*/}
            <Stack pt="120px">
                <DatingAllActivityBox />
            </Stack>
            {/* Create poll button */}
            <Box zIndex="4" position="fixed" w="100%" bottom={{ base: "70px", md: "30px" }}>
                <Container w="container.lg" maxW={"100%"} display="inline-flex" justifyContent="right" pr={{ base: "40px", md: "60px" }}>
                    <Box maxW="100%">
                        <DatingCreatePollButton />
                    </Box>
                </Container>
            </Box>
        </DatingAppBody>
    )
}

export default AllActivityPoll
