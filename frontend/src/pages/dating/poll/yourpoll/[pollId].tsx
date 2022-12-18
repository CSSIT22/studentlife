import {
    Badge,
    Box,
    Button,
    Container,
    Heading,
    Image,
    Text,
    useBoolean,
    useBreakpointValue,
    useToast,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Lottie from "lottie-react"
import DatingYourPollCancel from "src/components/dating/DatingYourPollCancel"
import DatingYourPollClose from "src/components/dating/DatingYourPollClose"
import DatingYourPollCloseAndAcceptAll from "src/components/dating/DatingYourPollCloseAndAcceptAll"
import DatingYourPollSeeMore from "src/components/dating/DatingYourPollSeeMore"
import API from "src/function/API"
import DatingAppBody from "../../../../components/dating/DatingAppBody"
import ChatImg from "../../../../components/dating/pic/chat.png"
import CheckImg from "../../../../components/dating/pic/check.png"
import { PollInfo } from "@apiType/dating"
import NoProfileImg from "../../../../components/dating/pic/noprofile.png"
import DatingLoading from "../../../../components/dating/lottie/DatingLoading.json"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import GroupChatImg from "../../../../components/dating/pic/groupchat.png"
import { motion } from "framer-motion"

// import { POLL } from "../../../../components/dating/shared/poll"
// import POLL_APPLICANT from "../../../../components/dating/shared/poll_applicant"

const YourPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1
    const params = useParams()

    // const pollInfo = POLL[POLL.findIndex((e) => e.pollId == pollId)]

    const [pollInfo, setPollInfo] = useState<PollInfo>()
    const [allParticipants, setAllParticipants] = useState<{
        isAccepted: boolean;
        user: {
            userId: string;
            fName: string;
            lName: string;
            image: {
                type: string;
                data: number[];
            };
        };
    }[]>([])
    const [participants, setParticipants] = useState<{
        isAccepted: boolean;
        user: {
            userId: string;
            fName: string;
            lName: string;
            image: {
                type: string;
                data: number[];
            };
        };
    }[]>([])

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
            API.get("/dating/yourpoll/getYourPoll/" + params.pollId).then((data) => {
                setPollInfo(data.data)
                if (data.data) {
                    let pollData = data.data
                    setAllParticipants(pollData.participants)
                    setParticipants(pollData.participants.slice(0, 20))
                }
            }).catch(on).finally(() => setIsLoading(false))
        }
    })

    function fetch() {
        API.get("/dating/yourpoll/getYourPoll/" + params.pollId).then((data) => {
            setPollInfo(data.data)
            let pollData = data.data
            setAllParticipants(pollData.participants)
            setParticipants(pollData.participants.slice(0, participants.length))
        })
    }

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }


    const handleAccept = (userId: string) => {
        if (pollInfo != undefined) {
            let routeToGroupChat = "/chat/" + pollInfo.roomId + "/inviteToGroup"
            API.post<{ target_id: string }>(routeToGroupChat, { target_id: userId })
            API.put<{ userId: string, pollId: string }>("/dating/yourpoll/updatePollApplicants", { userId: userId, pollId: pollInfo.pollId }).finally(() => fetch())
        }

    }
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function disableButton(id: string) {
        function disableButton(id: string) {
            let button = document.getElementById(id) as HTMLInputElement
            button.disabled = true
        }

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

        function handleChat(id: string) {
            setIsLoading(true)
            API.post<{ chatWith_id: string }>("/chat/createRoom", { chatWith_id: id }).then(() => navigate("/chat/"))
        }

        window.addEventListener('scroll', function () {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
                setParticipants(allParticipants.slice(0, participants.length + 20))
            }
        })
        window.removeEventListener('scroll', function () {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
                setParticipants(allParticipants.slice(0, participants.length + 20))
            }
        })

        const [isError, { on }] = useBoolean()
        const [isLoading, setIsLoading] = useState(true)

        return (
            (isError || isLoading ? <DatingAppBody> {isLoading && !isError ? (
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

                {isError ?
                    <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box> :
                    <></>}
            </DatingAppBody> : pollInfo ? <>
                <DatingAppBody>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}>
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
                                    {pollInfo?.pollName}
                                </Text>
                            </Box>
                            <Box display="flex" justifyContent="right" pb={{ base: "10px", md: "20px" }} pr={{ base: "12px", md: "0px" }}>
                                <motion.div
                                    initial={
                                        { cursor: "pointer" }
                                    }
                                    whileHover={{ scale: 1.2, }}
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    onClick={() => navigate("/chat/")}
                                >
                                    <Button
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        backgroundColor="white"
                                        border="1px solid"
                                        mr={{ base: "12px", md: "24px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Image src={GroupChatImg} />
                                    </Button>
                                </motion.div>
                            </Box>
                            {pollInfo ? <DatingYourPollSeeMore pollInfo={pollInfo} /> : <></>}
                        </Box>
                    </motion.div>
                    {pollInfo?.participants.length != undefined && pollInfo.participants.length > 0 ? <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}><Heading
                            color="black"
                            ml={{ base: "10px", md: "0px" }}
                            pb={{ base: "16px", md: "24px" }}
                            fontWeight="700"
                            fontSize={{ base: "25px", md: "26px" }}
                            lineHeight="150%"
                        >
                            People interested in joining your activity
                        </Heading></motion.div> : <></>}


                    {participants.map((participant) => (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 360,
                                damping: 20,
                            }}>
                            <Box
                                w="100%"
                                height={{ base: "90px", md: "100px" }}
                                backgroundColor="white"
                                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                borderRadius="10px"
                                mb={{ base: "8px", md: "12px" }}
                                display="flex"
                            >
                                <Box display="flex" alignItems="center" ml={{ base: "20px", md: "24px" }} w="140%">
                                    <motion.div
                                        initial={
                                            { cursor: "pointer" }
                                        }
                                        whileHover={{ scale: 1.2, }}
                                        whileTap={{
                                            scale: 0.8,
                                        }}
                                    >
                                        <Link to={"/user/" + participant.user.userId}>
                                            {participant.user.image ?
                                                <Image
                                                    borderRadius="full"
                                                    boxSize={{ base: "50px", md: "78px" }}
                                                    objectFit="cover"
                                                    src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + participant.user.userId}
                                                /> : <Image
                                                    borderRadius="full"
                                                    boxSize={{ base: "50px", md: "78px" }}
                                                    objectFit="cover"
                                                    src={NoProfileImg}
                                                />}
                                        </Link>
                                    </motion.div>
                                    {isMobile ? (
                                        <Text ml="24px" fontWeight="700" fontSize="24px" lineHeight="133%" color="black">
                                            {participant.user.fName.length > 20 ? <>{participant.user.fName.substring(0, 17)}... {participant.user.lName.substring(0, 1)}.</> : <>{participant.user.fName} {participant.user.lName.substring(0, 1)}.</>}
                                        </Text>
                                    ) : (
                                        <Text ml="12px" fontWeight="700" fontSize="16px" lineHeight="133%" color="black">
                                            {participant.user.fName.length > 9 ? <>{participant.user.fName.substring(0, 6)}... {participant.user.lName.substring(0, 1)}.</> : <>{participant.user.fName} {participant.user.lName.substring(0, 1)}.</>}
                                        </Text>
                                    )}
                                </Box>
                                {participant.isAccepted && isMobile ? <Box display="flex" alignItems="center" h="100%">                        <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 360,
                                        damping: 20,
                                    }}><Badge h="30px" colorScheme='green'><Text fontSize="20px">ACCEPTED</Text></Badge></motion.div></Box> : <></>}
                                <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                                    {participant.isAccepted ? <><Button
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        colorScheme="green"
                                        border="1px solid"
                                        borderColor="black"
                                        mr={{ base: "12px", md: "24px" }}
                                        ml={{ md: "20px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                        _hover={{ cursor: "not-allowed" }}
                                    >
                                        <Image src={CheckImg} />
                                    </Button></> : <motion.div
                                        initial={
                                            { cursor: "pointer" }
                                        }
                                        whileHover={{ scale: 1.2, }}
                                        whileTap={{
                                            scale: 0.8,
                                        }}
                                    ><Button
                                        id={participant.user.userId}
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        backgroundColor="white"
                                        border="1px solid"
                                        mr={{ base: "12px", md: "24px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                        onClick={() => { handleAccept(participant.user.userId), disableButton(participant.user.userId) }}
                                        onClick={() => { handleAccept(participant.user.userId), disableButton(participant.user.userId) }}
                                    >
                                            <Image src={CheckImg} />
                                        </Button></motion.div>}

                                    <motion.div
                                        initial={
                                            { cursor: "pointer" }
                                        }
                                        whileHover={{ scale: 1.2, }}
                                        whileTap={{
                                            scale: 0.8,
                                        }}
                                        onClick={() => handleChat(participant.user.userId)}
                                    ><Button
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        backgroundColor="white"
                                        border="1px solid"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                            <Image src={ChatImg} />
                                        </Button>
                                    </motion.div>
                                </Box>

                            </Box></motion.div>))}
                    <Box mt="300px" />
                </DatingAppBody>

                {pollInfo.isOpen ? <><Box zIndex="2" position="fixed" w="100%" justifyContent="space-between" bottom={0} id="bottomBar">
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
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}>
                                        <Text
                                            fontWeight="700"
                                            fontSize="20px"
                                            lineHeight="120%"
                                            color="white"
                                            textAlign="center"
                                            pl={{ base: "35px", md: "0" }}
                                            pr={{ base: "35px", md: "0" }}
                                        >
                                            Now, {pollInfo?.participants.length} {pollInfo?.participants.length != null && pollInfo?.participants.length != 1 ? <>people are</> : <>person is</>} interested in joining your activity.

                                        </Text>
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}>
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
                                    </motion.div>
                                    <Box display="flex" justifyContent="center" pt={"30px"}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <DatingYourPollClose pollId={pollInfo.pollId} />
                                        </motion.div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <DatingYourPollCloseAndAcceptAll numOfParticipants={pollInfo?.participants.length} pollId={pollInfo.pollId} />
                                        </motion.div>
                                    </Box>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}>
                                        <DatingYourPollCancel pollId={pollInfo.pollId} />
                                    </motion.div>
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
                    </Box></> : <></>}

            </> : <DatingAppBody><VStack maxW="100vw" minH="75vh" alignItems={"center"} justifyContent="center">
                <Box margin={10} p={5} bg="white" shadow={"lg"} rounded="xl">
                    <Heading fontSize={{ base: "md", lg: "lg", xl: "2xl" }}>
                        <Box as="span" color="orange.400">
                            Sorry!&nbsp;
                        </Box>
                        We cannot find the poll you are looking for.
                    </Heading>
                </Box>

            </VStack></DatingAppBody>)
        )
    }

    export default YourPoll
