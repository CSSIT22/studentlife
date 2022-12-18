import { HeartGiver, AllInterests } from "@apiType/dating"
import { Box, Center, HStack, SimpleGrid, Spinner, Text, useBoolean, useBreakpointValue, useToast } from "@chakra-ui/react"
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
import Lottie from "lottie-react"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import DatingNoOneLikeYou from "../../components/dating/lottie/DatingNoOneLikeYou.json"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import { motion } from "framer-motion"

const LikedYou = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1
    const [isError, setIsError] = useState(false)
    const [isLoading, { off }] = useBoolean(true)
    const [heartGiver, setHeartGiver] = useState<HeartGiver[]>([])
    const [allInterests, setAllInterests] = useState<AllInterests[]>([])
    const [giveToUser, setGiveToUser] = useState<string[]>([])
    const [allHeartGiver, setAllHeartGiver] = useState<HeartGiver[]>([])

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
                            else if (getAge(detail.data.birth) < 18) {
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
                            else if (getAge(detail.data.birth) > 40) {
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
                setAllHeartGiver(heart_history.data)
                let data = heart_history.data
                setHeartGiver(data.slice(0, 20))
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

    function lockButton(id: string) {
        (document.getElementById(id) as HTMLInputElement).style.display = "none";
        (document.getElementById(id + "a") as HTMLInputElement).style.display = "flex";
    }

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    window.addEventListener('scroll', function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (heartGiver.length != allHeartGiver.length)
                setHeartGiver(allHeartGiver.slice(0, heartGiver.length + 20))
        }
    })

    function handleClick(type: string, UserId: string) {
        if (type == "skip") {
            lockButton(UserId)
            API.post<{ anotherUserId: string, isSkipped: boolean, }>("/dating/likedyou/setHeartHistory", { anotherUserId: UserId, isSkipped: true }).catch(() => setIsError(true)).finally(() => { setGiveToUser(giveToUser => [...giveToUser, UserId]), setHeartGiver(allHeartGiver.slice(0, heartGiver.length + 1)) })
        } else if (type == "like") {
            lockButton(UserId)
            API.post<{ anotherUserId: string, isSkipped: boolean, }>("/dating/likedyou/setHeartHistory", { anotherUserId: UserId, isSkipped: false }).catch(() => setIsError(true)).finally(() => { setGiveToUser(giveToUser => [...giveToUser, UserId]), setHeartGiver(allHeartGiver.slice(0, heartGiver.length + 1)) })
        }
    }

    return (
        <DatingAppBody>
            {isLoading || isError ? <>
            </> : giveToUser.length == heartGiver.length ? <><Center>
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
                        <DatingLikedYouButton backgroundColor="orange.600" />
                        <DatingYouLikedButton backgroundColor="orange.800" />
                    </HStack>
                </Box>
            </Center>

                <Box display="block" position="fixed" left="50%" transform="translateX(-50%)" top={{ base: "30%", md: "35%" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}>
                        <Lottie animationData={DatingNoOneLikeYou} loop={true} style={{ scale: "0.7" }} />
                        <Text mt="-20%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                            Right now, you don't have any new likes.
                        </Text>
                    </motion.div>

                </Box></> :
                <>
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
                                <DatingLikedYouButton backgroundColor="orange.600" />
                                <DatingYouLikedButton backgroundColor="orange.800" />
                            </HStack>
                        </Box>
                    </Center>

                    {isMobile ? (
                        <Box mt="130px"></Box>
                    ) : (
                        <Box mt="10px"></Box>
                    )}

                    <Box
                        display={{ base: "grid", md: "block" }}
                        ml={{ base: "5px", md: "0px" }}
                        gridTemplateColumns="repeat(auto-fill, 165px)"
                        gridGap="10px"
                        justifyContent="center"
                        mt="90px"
                    >

                        {heartGiver.filter((el) => !giveToUser?.some((f) => f == el.heartGiver.userId))
                            .map(({ heartGiver }) => (<>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 360,
                                        damping: 20,
                                    }}>
                                    <Box key={heartGiver.userId} w={{ base: "159px", md: "100%" }} ml={{ md: "10px" }} mr={{ md: "10px" }}>
                                        <SimpleGrid display="flex" columns={{ base: 1, md: 2 }} gap="56px">
                                            <Box>
                                                <DatingCheckImage url={heartGiver.userId} image={heartGiver.image} />
                                                <DatingCheckMobileDetails isMobile={isMobile} Fname={heartGiver.fName} Lname={heartGiver.lName} />

                                                <HStack
                                                    ml={{ base: "25px", md: "25px" }}
                                                    gap={{ base: "15px", md: "30px" }}
                                                    mt={{ base: "6px", md: "12px" }}
                                                    mb={{ md: "12px" }}
                                                    id={heartGiver.userId}
                                                >
                                                    <DatingLikedYouCrossButton isMobile={isMobile} handleClick={handleClick} UserId={heartGiver.userId} />
                                                    <DatingLikedYouHeartButton isMobile={isMobile} handleClick={handleClick} UserId={heartGiver.userId} />
                                                </HStack>
                                                <Spinner display="none" id={heartGiver.userId + "a"} size={{ base: "md", md: "xl" }} ml={{ base: "65px", md: "80px" }} mt="20px" mb="15px" />
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
                                </motion.div></>
                            ))}
                    </Box></>
            }


            {
                (isLoading) && !isError ? (
                    <>
                        <Box w="800px" h="400px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "450px", md: "400px" }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.6" }} />
                            </motion.div>
                        </Box>
                        <Box w="350px" h="100px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "180px", md: "125px" }}>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: `0.25em`
                                }}
                                animate={{
                                    opacity: 1,
                                    y: `0em`,
                                    transition: {
                                        duration: 1,
                                        ease: [0.2, 0.65, 0.3, 0.9],
                                    }
                                }}
                            >
                                <Text mt="-25%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "2xl", md: "5xl" }} lineHeight="120%" pl="18px" >
                                    LOADING
                                </Text>
                            </motion.div>
                        </Box>
                    </>
                ) : (
                    <></>
                )
            }

            {
                isError ? (
                    <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box>
                ) : (
                    <></>
                )
            }
        </DatingAppBody >
    )
}

export default LikedYou
