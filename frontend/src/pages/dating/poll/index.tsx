import { Polls } from "@apiType/dating"
import { Box, Center, Container, Flex, HStack, Stack, useBoolean, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityBox from "src/components/dating/DatingAllActivityBox"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import API from "src/function/API"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import DatingLoading from "../../../components/dating/lottie/DatingLoading.json"

const AllActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1;
    const [poll, setPoll] = useState<Polls[]>([])
    const [userId, setUserId] = useState<string>("")
    const [isLoading, setIsloading] = useState(true)
    const [isError, { on }] = useBoolean()
    const [allPoll, setAllPoll] = useState<Polls[]>([])

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
                API.get("/dating/allpoll/getAllPoll").then((data) => {
                    setAllPoll(data.data)
                    let pollData = data.data
                    setPoll(pollData.slice(0, 20))
                }).catch(on).finally(() => setIsloading(false))
                API.get("/dating/allpoll/getAllPollUserId").then((data) => {
                    setUserId(data.data)
                }).catch(on)
            })
            // API.get("/dating/allpoll/getAllPoll").then((data) => {
            //     setPoll(data.data)
            //     // console.log("Poll data " + data.data);
            //     // console.log("Poll raw data " + data.data[0].userId);
            // }).catch((err) => console.log(err));
            // API.get("/dating/allpoll/getAllPollUserId").then((data) => {
            //     setUserId(data.data)
            // }).catch((err) => console.log(err));
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    function fetch(pId: string) {
        API.get("/dating/allpoll/getAllPoll").then((data) => {
            setAllPoll(data.data)
            let pollData = data.data
            setPoll(pollData.slice(0, poll.length))
        }).catch(on).finally(() => {setIsloading(false), (document.getElementById(pId) as HTMLInputElement).disabled = false})

    }

    window.addEventListener('scroll', function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPoll(allPoll.slice(0, poll.length + 20))
        }
    })

    return (
        <DatingAppBody>
            {isLoading || isError ? <></> : <>
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
                <Stack pt="150px" pb="60px">
                    <DatingAllActivityBox poll={poll} userId={userId} fetch={fetch} />
                </Stack>
                {/* Create poll button */}
                <Box zIndex="4" bg="transparent" color="tomato" float="right" position="fixed" right={{ base: "15px", md: "20px" }} bottom={{ base: "70px", md: "30px" }} _hover={{ color: "black" }}>
                    <DatingCreatePollButton />
                </Box></>}
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
                                <Box mt="-25%" textAlign={"center"} color="black" fontWeight="700" fontSize={{ base: "2xl", md: "5xl" }} lineHeight="120%" pl="18px" >
                                    LOADING
                                </Box>
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
        </DatingAppBody>
    )
}

export default AllActivityPoll
