import {
    HStack,
    Box,
    Center,
    useToast,
    Button,
    Text,
    Image,
    useBreakpointValue,
    Flex,
    Spacer,
    Badge,
    useDisclosure,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Modal,
    Heading,
    ModalOverlay,
    useBoolean,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import Lottie from "lottie-react"
import DatingYourPollSeeMore from "src/components/dating/DatingYourPollSeeMore"
import NoProfileImg from "../../../components/dating/pic/noprofile.png"
import API from "src/function/API"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import ChatImg from "../../../components/dating/pic/chat.png"
import GroupChatImg from "../../../components/dating/pic/groupchat.png"
import { POLL } from "src/components/dating/shared/poll"
import { motion } from "framer-motion"
import ModalPoll from "src/components/dating/DatingYourPollSeeMore"
import DatingLoading from "../../../components/dating/lottie/DatingLoading.json"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import { PollInfo } from "@apiType/dating"
import NoActivity from "../../../components/dating/lottie/NoActivity.json"

const YourAppliedActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    const [poll, setPoll] = useState<PollInfo[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    let count = 1
    const [isLoading, setIsLoading] = useState(true)
    const [isError, { on }] = useBoolean()

    function handlePeople(min: number, max: number) {
        if (max === min && max === 1) {
            return min + " person"
        } else if (max === min && max !== 1) {
            return min + " people"
        } else {
            return min + "-" + max + " people"
        }
    }

    function handleStatus(status: string) {
        if (status === "Accepted") {
            return "green"
        } else {
            return "yellow"
        }
    }

    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions").then((datingOptions) => {
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
                                description: 'Please specify your "birth date" and "sex" before using Dating & Finding Friend.',
                            })
                            navigate("/user")
                        } else if (getAge(detail.data.birth) < 18) {
                            toast({
                                title: "You don't meet the minimum age requirement!",
                                status: "warning",
                                duration: 10000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to be at least 18 years old to use Dating & Finding Friend.",
                            })
                            navigate("/")
                        } else if (getAge(detail.data.birth) > 40) {
                            toast({
                                title: "You don't meet the maximum age requirement!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to be at most 40 years old to use Dating & Finding Friend.",
                            })
                            navigate("/")
                        } else if (!datingEnroll.data.hasCompleteTutorial) {
                            toast({
                                title: "Welcome!",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend.",
                            })
                            navigate("/dating/tutorial")
                        } else if (!datingOptions.data.userId) {
                            navigate("/dating/option")
                            toast({
                                title: "Option Setting Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to set your option first before using Dating & Finding Friend.",
                            })
                        } else if (!datingEnroll.data.hasCompleteSetting) {
                            toast({
                                title: "Interests Selection Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to skip or select your interests first before using Dating & Finding Friend.",
                            })
                            navigate("/dating/interests")
                        }
                    })
                })
            })
            API.get("/dating/appliedpoll/getAppliedPolls").then((data) => {
                // setInfo(data.data)
                setPoll(

                    data.data.map((item: any) => ({
                        ...item,
                        ...item.poll,
                        pollStatus: item.isAccepted ? "Accepted" : "Pending..."

                        // creator: {
                        //     ...item.poll.pollCreator,
                        //     Fname: item.poll.pollCreator.fName,
                        //     Lname: item.poll.pollCreator.lName,
                        //     img: {
                        //         type: item.poll.pollCreator.type,
                        //         data: item.poll.pollCreator.data
                        //     },
                        //     url: (import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item.poll.pollCreator.userId
                        // },
                        // participants: [
                        //     ...item.poll.participants,
                        // ],
                        // interests: [
                        //     ...item.poll.interests
                        // ],
                        // pollStatus: item.isAccepted ? "Accepted" : "Pending...",
                    }))
                )
            }).catch(on).finally(() => setIsLoading(false))
        }
    })

    console.log(poll)


    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    function goToProfile(userId: string) {
        navigate("/user/" + userId)
    }

    function handleChat(id: string) {
        setIsLoading(true)
        API.post<{ chatWith_id: string }>("/chat/createRoom", { chatWith_id: id }).then(() => navigate("/chat/"))
    }

    return (
        <DatingAppBody>
            {isLoading && !isError ? (
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

            {isLoading || isError ? <></> : <><Center>
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
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.600"} />
                    </HStack>
                </Box>
            </Center>

                <Box mt="130px"></Box>
                {/* Test 2: click to see more at medium bottom + group chat and chat button */}
                <Box>
                    {poll.length > 0 ?
                        (
                            poll.map((values) => {
                                // console.log("v", values);

                                return (
                                    <Box
                                        backgroundColor="white"
                                        boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                        borderRadius="10px"
                                        mb={{ base: "8px", md: "25px" }}
                                    >
                                        <Flex>
                                            <Box>
                                                <Text
                                                    pt="17px"
                                                    pl="30px"
                                                    pr="31px"
                                                    color="black"
                                                    fontWeight="700"
                                                    fontSize={{ base: "20px", md: "26px" }}
                                                    lineHeight="120%"
                                                >
                                                    {values.pollName}
                                                </Text>
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <Badge mt="17px" mr="30px" lineHeight="133%" fontSize="15px" colorScheme={handleStatus((values as any).pollStatus)}>
                                                    {(values as any).pollStatus}
                                                </Badge>
                                            </Box>
                                        </Flex>

                                        <Flex>
                                            <Box pt="6" pb="6">
                                                {isMobile ? (
                                                    <Text ml="30px" fontWeight="500" fontSize="20px" lineHeight="133%" color="black">
                                                        {values?.pollCreator?.fName}
                                                        &nbsp;
                                                        {values?.pollCreator?.lName}
                                                    </Text>
                                                ) : (
                                                    <Text ml="30px" fontWeight="500" fontSize="16px" lineHeight="133%" color="black">
                                                        {values?.pollCreator?.fName}
                                                        &nbsp;
                                                        {values?.pollCreator?.lName}
                                                    </Text>
                                                )}
                                            </Box>
                                            <Spacer />
                                            <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                                                {(values as any).pollStatus == "Accepted" ? <motion.div
                                                    initial={
                                                        { cursor: "pointer" }
                                                    }
                                                    whileHover={{ scale: 1.2, }}
                                                    whileTap={{
                                                        scale: 0.8,
                                                    }}
                                                    onClick={() => navigate("/chat/")}
                                                ><Button
                                                    borderRadius="full"
                                                    w={{ base: "50px", md: "72px" }}
                                                    h={{ base: "50px", md: "72px" }}
                                                    backgroundColor="white"
                                                    border="1px solid"
                                                    mr={{ base: "12px", md: "24px" }}
                                                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                                >
                                                        <Image src={GroupChatImg} />
                                                    </Button></motion.div> : <></>}
                                                <motion.div
                                                    initial={
                                                        { cursor: "pointer" }
                                                    }
                                                    whileHover={{ scale: 1.2, }}
                                                    whileTap={{
                                                        scale: 0.8,
                                                    }}
                                                    onClick={() => handleChat(values.pollCreator.userId)}
                                                ><Button
                                                    borderRadius="full"
                                                    w={{ base: "50px", md: "72px" }}
                                                    h={{ base: "50px", md: "72px" }}
                                                    backgroundColor="white"
                                                    border="1px solid"
                                                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                                >
                                                        <Image src={ChatImg} />
                                                    </Button></motion.div>
                                            </Box>
                                        </Flex>

                                        <Box display="flex" w="100%" justifyContent="right" pt="10px" mr="30px">
                                            {/* <Text
                                        lineHeight="150%"
                                        color="black"
                                        fontWeight="400"
                                        fontSize={{ base: "14px", md: "16px" }}
                                        as="u"
                                        mb="20px"
                                        cursor="pointer"
                                        onClick={onOpen}
                                    >
                                        Click to see more
                                    </Text> */}

                                            {values && <ModalPoll pollInfo={values} />}
                                        </Box>
                                    </Box>
                                )
                            })
                        ) : (<Box display="block" pt="50px" position="fixed" left="50%" transform="translateX(-50%)" top={{ base: "30%", md: "25%" }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Lottie animationData={NoActivity} loop={true} style={{ scale: "0.5" }} /></motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Text textAlign="center" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                                    Right now, you haven't applied any polls.
                                </Text></motion.div>
                        </Box>)}
                </Box>
            </>}
        </DatingAppBody>
    )
}

export default YourAppliedActivityPoll

function handlePeople(participantMin: any, participantMax: any): import("react").ReactNode {
    throw new Error("Function not implemented.")
}
