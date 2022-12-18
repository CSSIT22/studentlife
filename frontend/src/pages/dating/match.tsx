import { Box, Button, GridItem, Heading, useBreakpointValue, useToast, Image, Text, useBoolean } from "@chakra-ui/react"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import API from "src/function/API"
import DatingAppBody from "../../components/dating/DatingAppBody"
import ChatImg from "../../components/dating/pic/chat.png"
import NoProfileImg from "../../components/dating/pic/noprofile.png"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import DatingNoOneLikeYou from "../../components/dating/lottie/DatingNoOneLikeYou.json"
import { HeartReceiver } from "@apiType/dating"
import { motion } from "framer-motion"


const DatingMatch = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    const [poll, setPoll] = useState([])
    let count = 1
    const [heartGiver, setHeartGiver] = useState<HeartReceiver[]>([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
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
            API.get("/dating/matches/getMatches").then((data) => {
                console.log(data.data)
                setPoll(data.data)
            }).catch(() => setIsError(true)).finally(() => setIsLoading(false))
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
    // const pollInfo = POLL[POLL.findIndex((e) => e.pollId == pollId)]

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function handleChat(id: string) {
        setIsLoading(true)
        API.post<{ chatWith_id: string }>("/chat/createRoom", { chatWith_id: id }).then(() => navigate("/chat/"))
    }

    function goToProfile(userId: string) {
        navigate("/user/" + userId)
    }

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

    console.log(poll);


    return (
        <DatingAppBody>
            {isLoading || isError ? <></> :
                <>
                    <Box mb="20px">
                        <GridItem pt="5" pl="2" area={"topic"} >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                                    You are match with
                                </Heading>
                            </motion.div>
                        </GridItem>
                    </Box>

                    <Box>

                        <Box>
                            {poll.map((values: any) => {
                                return (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}>
                                        <Box w="100%"
                                            height={{ base: "90px", md: "100px" }}
                                            backgroundColor="white"
                                            boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                            borderRadius="10px"
                                            mt="5px"
                                            key={values.userId}
                                            mb={{ base: "8px", md: "12px" }}
                                            display="flex"
                                        // cursor="pointer"
                                        // onClick={() => goToProfile(values.userId)}
                                        >



                                            <Box display="flex" alignItems="center" ml={{ base: "20px", md: "24px" }} w="65%">
                                                <motion.div
                                                    initial={
                                                        { cursor: "pointer" }
                                                    }
                                                    whileHover={{ scale: 1.2, }}
                                                    whileTap={{
                                                        scale: 0.8,
                                                    }}
                                                >
                                                    {values.image ?
                                                        <Image
                                                            borderRadius="full"
                                                            boxSize={{ base: "50px", md: "78px" }}
                                                            objectFit="cover"
                                                            src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.userId}
                                                            alt={values.fName + " " + values.lName}
                                                            cursor="pointer"
                                                            onClick={() => goToProfile(values.userId)}
                                                        /> : <Image
                                                            borderRadius="full"
                                                            boxSize="78px"
                                                            objectFit="cover"
                                                            src={NoProfileImg}
                                                            alt={values.fName + " " + values.lName}
                                                            cursor="pointer"
                                                            onClick={() => goToProfile(values.userId)}
                                                        />
                                                    }
                                                </motion.div>
                                                {isMobile ? (
                                                    <Text ml="24px" fontWeight="700" fontSize="24px" lineHeight="133%" color="black">
                                                        {values.fName}
                                                        &nbsp;
                                                        {values.lName}
                                                    </Text>
                                                ) : (
                                                    <Text ml="12px" fontWeight="700" fontSize="16px" lineHeight="133%" color="black">
                                                        {values.fName}
                                                        &nbsp;
                                                        {values.lName}
                                                    </Text>
                                                )
                                                }
                                            </Box>
                                            <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                                                <motion.div
                                                    initial={
                                                        { cursor: "pointer" }
                                                    }
                                                    whileHover={{ scale: 1.2, }}
                                                    whileTap={{
                                                        scale: 0.8,
                                                    }}
                                                    onClick={() => handleChat(values.userId)}
                                                >
                                                    <Button
                                                        borderRadius="full"
                                                        w={{ base: "50px", md: "72px" }}
                                                        h={{ base: "50px", md: "72px" }}
                                                        backgroundColor="white"
                                                        border="1px solid"
                                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">

                                                        <Image src={ChatImg} />
                                                    </Button>
                                                </motion.div>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                )
                            })}
                        </Box>

                    </Box>
                </>}


            {!(isLoading || isError) && poll.length == 0 &&
                <Box display="block" position="fixed" left="50%" transform="translateX(-50%)" top={{ base: "30%", md: "25%" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}>
                        <Lottie animationData={DatingNoOneLikeYou} loop={true} style={{ scale: "0.7" }} /></motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}>
                        <Text mt="-20%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                            Right now, you don't have any new matches.
                        </Text></motion.div>
                </Box>
            }


            {(isLoading) && !isError ? (
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
            )}

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

export default DatingMatch
