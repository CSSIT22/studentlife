import { Box, Container, HStack, SimpleGrid, useBreakpointValue, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingCheckDesktopDetails from "src/components/dating/DatingCheckDesktopDetails"
import DatingCheckImage from "src/components/dating/DatingCheckImage"
import DatingCheckMobileDetails from "src/components/dating/DatingCheckMobileDetails"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingLikedYouCrossButton from "src/components/dating/DatingLikedYouCrossButton"
import DatingLikedYouHeartButton from "src/components/dating/DatingLikedYouHeartButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import API from "src/function/API"
import DatingAppBody from "../../components/dating/DatingAppBody"
import { HEART_HISTORY } from "../../components/dating/shared/heart_history"

interface state {
    heart_history: {
        UserId: string
        Fname: string
        Lname: string
        Gender: string
        Age: string
        Faculty: string
        url: string
        interestId: number[]
    }[]
}
const LikedYou = () => {
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

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    let HState = { heart_history: HEART_HISTORY }

    const [giveToUser, setGiveToUser] = useState<
        | {
            UserId: string
            isSkipped: boolean
        }[]
        | {
            UserId: string
            isSkipped: boolean
        }[]
    >([])

    function handleClick(type: string, UserId: string) {
        if (type == "skip") {
            setGiveToUser(giveToUser?.concat({ UserId: UserId, isSkipped: true }))
        } else if (type == "like") {
            setGiveToUser(giveToUser?.concat({ UserId: UserId, isSkipped: false }))
        }
    }

    return (
        <DatingAppBody>
            <Box display="flex" justifyContent="center">
                <Box bg="#FFF2E6" position="fixed" w="100%" justifyContent="space-between" top={{ base: 21, md: 157 }} id="bottomBar">
                    <Box maxW="100%" pt={{ base: "40px", md: "7px" }}></Box>
                    <HStack gap={{ base: "20px", md: "100px" }} display="flex" justifyContent="center" pt={{ base: "40px", md: "30px" }} pb="30px">
                        <DatingLikedYouButton backgroundColor="orange.600" />
                        <DatingYouLikedButton backgroundColor="orange.800" />
                    </HStack>
                </Box>
            </Box>

            <Box
                display={{ base: "grid", md: "block" }}
                ml={{ base: "5px", md: "0px" }}
                gridTemplateColumns="repeat(auto-fill, 165px)"
                gridGap="10px"
                justifyContent="center"
                mt="120px"
            >
                {HState.heart_history
                    .filter((el) => !giveToUser?.some((f) => f.UserId == el.UserId))
                    .map(({ UserId, Fname, Lname, Gender, Age, Faculty, url, interestId }) => (
                        <Box key={UserId} w={{ base: "159px", md: "100%" }} ml={{ md: "10px" }} mr={{ md: "10px" }}>
                            <SimpleGrid display="flex" columns={{ base: 1, md: 2 }} gap="56px">
                                <Box>
                                    <DatingCheckImage url={url} />
                                    <DatingCheckMobileDetails isMobile={isMobile} Fname={Fname} Lname={Lname} />

                                    <HStack
                                        ml={{ base: "25px", md: "25px" }}
                                        gap={{ base: "15px", md: "30px" }}
                                        mt={{ base: "6px", md: "12px" }}
                                        mb={{ md: "12px" }}
                                    >
                                        <DatingLikedYouCrossButton isMobile={isMobile} handleClick={handleClick} UserId={UserId} />
                                        <DatingLikedYouHeartButton isMobile={isMobile} handleClick={handleClick} UserId={UserId} />
                                    </HStack>
                                </Box>
                                <DatingCheckDesktopDetails
                                    Fname={Fname}
                                    Lname={Lname}
                                    Gender={Gender}
                                    Age={Age}
                                    Faculty={Faculty}
                                    interestId={interestId}
                                />
                            </SimpleGrid>

                            {isMobile ? <hr style={{ height: "1px", backgroundColor: "black" }} /> : <></>}
                        </Box>
                    ))}
            </Box>
        </DatingAppBody>
    )
}

export default LikedYou
