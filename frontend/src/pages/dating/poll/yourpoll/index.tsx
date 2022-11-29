import { HStack, Stack, Box, Center, Flex, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingYourActivityBox from "src/components/dating/DatingYourActivityBox"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import API from "src/function/API"
import DatingAppBody from "../../../../components/dating/DatingAppBody"

const YourActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    useEffect(() => {
        if (didMount) {
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
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" justifyContent="center" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.800"} />
                        <DatingYourActivityButton backgroundColor={"orange.600"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.800"} />
                    </HStack>
                </Box>
            </Center>
            {/* Calling all your activity poll out (Need to order by time [desc])*/}
            <Stack pt="120px">
                <DatingYourActivityBox />
            </Stack>
            {/* Create poll button */}
            <Box zIndex="4" position="fixed" w="100%" bottom={{ base: "70px", md: "30px" }}>
                <Container w="container.lg" maxW={"100%"} display="inline-flex" justifyContent="right" pr={{ base: "40px", md: "60px" }}>
                    <Box maxW="100%">
                        <Box></Box>
                        <DatingCreatePollButton />
                    </Box>
                </Container>
            </Box>
        </DatingAppBody>
    )
}

export default YourActivityPoll
