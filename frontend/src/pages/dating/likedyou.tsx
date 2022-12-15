import { HeartGiver, AllInterests } from "@apiType/dating"
import { Box, Container, HStack, SimpleGrid, useBoolean, useBreakpointValue, useToast } from "@chakra-ui/react"
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


const LikedYou = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1
    const [isError, setIsError] = useState(false)
    const [isLoading, { off }] = useBoolean(true)
    const [heartGiver, setHeartGiver] = useState<HeartGiver[]>([])
    const [allInterests, setAllInterests] = useState<AllInterests[]>([])

    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions")
                    .then((datingOptions) => {
                        API.get("/dating/verifyEnroll/getDetail").then((detail) => {
                            function getAge(dateString: Date) {
                                var today = new Date()
                                var birthDate = new Date(dateString)
                                var age = today.getFullYear() - birthDate.getFullYear()
                                var m = today.getMonth() - birthDate.getMonth()
                                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                    age--
                                }
                                return age
                            }
                            if (!detail.data.sex || !detail.data.birth) {
                                toast({
                                    title: "It looks like some of your details are missing!",
                                    status: "warning",
                                    duration: 10000,
                                    isClosable: true,
                                    position: "top",
                                    description: "Please specify your \"birth date\" and \"sex\" before using Dating & Finding Friend."
                                })
                                navigate("/user")
                            }
                            else if(getAge(detail.data.birth) < 18) {
                                toast({
                                    title: "You don't meet the minimum age requirement!",
                                    status: "warning",
                                    duration: 10000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to be at least 18 years old to use Dating & Finding Friend."
                                })
                                navigate("/")
                            }
                            else if(getAge(detail.data.birth) > 40) {
                                toast({
                                    title: "You don't meet the maximum age requirement!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to be at most 40 years old to use Dating & Finding Friend."
                                })
                                navigate("/")
                            }
                            else if (!datingEnroll.data.hasCompleteTutorial) {
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
            })

            API.get("/dating/likedyou/getAllInterest").then((data) => {
                setAllInterests(data.data)
            }).catch((err) => setIsError(true))

            API.get("/dating/likedyou/getHeartHistory").then((heart_history) => {
                setHeartGiver(heart_history.data)
            }).catch((err) => setIsError(true)).finally(off)
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
                {heartGiver
                    .map(({ heartGiver }) => (
                        <Box key={heartGiver.userId} w={{ base: "159px", md: "100%" }} ml={{ md: "10px" }} mr={{ md: "10px" }}>
                            <SimpleGrid display="flex" columns={{ base: 1, md: 2 }} gap="56px">
                                <Box>
                                    <DatingCheckImage url={heartGiver.userId} image={heartGiver.image}/>
                                    <DatingCheckMobileDetails isMobile={isMobile} Fname={heartGiver.fName} Lname={heartGiver.lName} />

                                    <HStack
                                        ml={{ base: "25px", md: "25px" }}
                                        gap={{ base: "15px", md: "30px" }}
                                        mt={{ base: "6px", md: "12px" }}
                                        mb={{ md: "12px" }}
                                    >
                                        <DatingLikedYouCrossButton isMobile={isMobile} handleClick={handleClick} UserId={heartGiver.userId} />
                                        <DatingLikedYouHeartButton isMobile={isMobile} handleClick={handleClick} UserId={heartGiver.userId} />
                                    </HStack>
                                </Box>
                                <DatingCheckDesktopDetails
                                    Fname={heartGiver.fName}
                                    Lname={heartGiver.lName}
                                    Gender={heartGiver.details.sex}
                                    Birth={heartGiver.details.birth}
                                    Faculty={heartGiver.studentMajor.majorFaculty.facultyName}
                                    Interests={heartGiver.interests}
                                    AllInterests={allInterests}
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
