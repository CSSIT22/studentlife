import { Box, Button, Center, Flex, Heading, Image, Spacer, Tag, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
// import { POLL } from "./shared/poll"
import { Link, useParams } from "react-router-dom"
import { POLL_APPLICANT } from "./shared/poll_applicant"
import { useToast } from "@chakra-ui/react"
// import { INTERESTS } from "./shared/interests"
import API from "src/function/API"
import NoProfileImg from "../../components/dating/pic/noprofile.png"
import { ApplyPoll, Polls } from "@apiType/dating"
import Lottie from "lottie-react"
import { delay, motion } from "framer-motion"
import NoActivity from "../../components/dating/lottie/NoActivity.json"


declare global {
    var date: string, time: string
}

// Component of all activity page
const DatingAllActivityBox: FC<{ poll: Polls[]; userId: string; fetch(pId: string): void }> = ({ poll, userId, fetch }) => {
    const params = useParams()
    // const [poll, setPoll] = useState(POLL)

    // const [interests, setInterests] = useuseState<string>("")State(INTERESTS)
    // const [pollApplicant, setPollApplicant] = useState(POLL_APPLICANT)
    // let count = 1
    // function appiled(pId: string) {
    //     const today = new Date()
    //     // NEED TO ADD DATA TO DATABASE HERE!!!!
    //     console.log("Is appiled " + pId)
    //     console.log(today)
    // }
    const toast = useToast()
    function handleApply(pId: string, apState: boolean, pollName: string, pollCreaterId: string) {
        let button = document.getElementById(pId) as HTMLInputElement
        button.disabled = true
        const now = new Date()
        now.setHours(now.getHours() + 7);
        // console.log(pId + " s: " + apState)
        apState ? (
            <></>
        ) : (
            // If user apply -> tost, add data to db, change button state
            API.post<ApplyPoll>("/dating/allpoll/applyPoll", { pollId: pId, isAccepted: false, registerTime: now, pollCreaterId: pollCreaterId, pollName: pollName })
                .catch((err) => console.log(err))
                .finally(() => {
                    fetch(pId)
                })
            // (appiled(pId),
            //     toast({
            //         title: "Applied success",
            //         description: "You have registered for the poll. Now you can chat with the poll creator.",
            //         status: "success",
            //         duration: 4500,
            //         isClosable: true,
            //         position: "top",
            //     }))
        )
    }


    // Convert date in to format that easy to read
    function handlePollDate(dateTime: string) {
        const chooseDate = new Date(dateTime)
        chooseDate.setHours(chooseDate.getHours() - 7);
        // console.log(chooseDate.getMonth())
        // return chooseDate.getDate() + "/" + (chooseDate.getMonth() + 1) + "/" + chooseDate.getFullYear()
        // const d = chooseDate.toLocaleDateString()
        // const strDate = chooseDate.toLocaleDateString()
        // return chooseDate.getDay() + "/" + chooseDate.getMonth() + "/" + chooseDate.getFullYear()
        const d = chooseDate.toISOString()
        return d.substring(8, 10) + "/" + d.substring(5, 7) + "/" + chooseDate.getFullYear()
    }

    // Convert time in to format that easy to read
    function hanlePollTime(dateTime: string) {
        const result = new Date(dateTime);
        result.setHours(result.getHours() - 7);
        const time = new Date(result)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let ampm = hours >= 12 ? "pm" : "am"
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        let minute = minutes < 10 ? "0" + minutes : minutes
        let strTime = hours + ":" + minute + " " + ampm
        return strTime
    }

    // Check for applied poll (Need data from database)
    // function isApply(pId: string) {
    //     for (const element of poll) {
    //         if (pId === element.pollId) {
    //             return true
    //         }
    //     }
    //     return false
    // }


    // Make the number of people into correct grammar
    function handlePeople(min: number, max: number) {
        if (max === min && max === 1) {
            return min + " person"
        } else if (max === min && max !== 1) {
            return min + " people"
        } else {
            return min + "-" + max + " people"
        }
    }

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return (
        <Box borderRadius="10px" color="black">
            {poll.length > 0 ?
                poll.map((values: Polls) => {
                    // For set the apply state only
                    // const [applyState, setApplyState] = useState(isApply(values.pollId))
                    globalThis.date = handlePollDate(values.pollAppointAt)
                    globalThis.time = hanlePollTime(values.pollAppointAt)
                    return (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 360,
                                damping: 20,
                            }}
                        >
                            <Box key={values.pollId} mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl" mb="30px">
                                <Flex>
                                    <Link to={"/user/" + values.pollCreator.userId}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            whileTap={{ scale: 1 }}
                                            whileHover={{ scale: 1.2, }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}
                                        >
                                            <Image
                                                borderRadius="full"
                                                boxSize="78px"
                                                objectFit="cover"
                                                src={values.pollCreator.image ?
                                                    (import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.pollCreator.userId
                                                    :
                                                    NoProfileImg
                                                }
                                            />
                                        </motion.div></Link>
                                    <Center>
                                        <Text ml="30px" fontSize="20px">
                                            {values.pollCreator.fName}
                                            &nbsp;
                                            {!isMobile ? (values.pollCreator.lName.substring(0, 1) + ".") : values.pollCreator.lName}
                                        </Text>
                                    </Center>
                                </Flex>
                                <Heading fontSize="20px" pt="10px">
                                    {values.pollName}
                                </Heading>
                                {values.interests.length < 1 ? <Text pb="20px"></Text> :
                                    <Box pt="20px" height="70px" overflow={{ base: "hidden", md: "visible" }}>
                                        <Box
                                            height="70px"
                                            pt="5px"
                                            overflowX={{ base: "auto", md: "visible" }}
                                            whiteSpace={{ base: "nowrap", md: "initial" }}
                                            style={{ WebkitOverflowScrolling: "touch" }}
                                        >
                                            {values.interests.map((i) => (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    style={{ display: "inline-block" }}
                                                    whileTap={{ scale: 1 }}
                                                    whileHover={{ scale: 1.2, }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 360,
                                                        damping: 20,
                                                    }}
                                                >
                                                    <Tag
                                                        backgroundColor="orange.400"
                                                        color="white"
                                                        mr="1"
                                                        mb="1"
                                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                                        borderRadius="5px"
                                                        h={{ md: "28px" }}
                                                    >
                                                        <Text mt="5px" mb="5px" ml="15px" mr="15px" fontWeight="400" fontSize={{ base: "12px", md: "16px" }} lineHeight="150%">
                                                            {i.interest.interestName}
                                                        </Text>
                                                    </Tag>
                                                </motion.div>
                                            ))}
                                        </Box>
                                    </Box>
                                }
                                <Text fontSize="16px">
                                    {values.pollText.length > 1 ? "Description:" : ""} {values.pollText}
                                </Text>

                                <Text fontSize="16px">Location: {values.pollPlace}</Text>

                                <Text fontSize="16px">Date: {globalThis.date}</Text>
                                <Text fontSize="16px">Time: {globalThis.time}</Text>
                                <Text fontSize="16px">
                                    Number of people: {handlePeople(values.participantMin, values.participantMax)}
                                    {/* {values.participantMin}-{values.participantMax} people */}
                                </Text>
                                <Flex justifyContent="end">
                                    {/* Check if poll open or close to display different button */}
                                    {values.pollCreator.userId !== userId ?
                                        (values.isOpen ? (
                                            // If the poll have been applied user can click to navigate to appiledpoll page
                                            <Link to={values.participants.length != 0 ? "/dating/poll/appliedpoll" : ""} style={{ textDecoration: "none" }}>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    whileHover={{ scale: 1.1, }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 360,
                                                        damping: 20,
                                                    }}
                                                >
                                                    {(values.participants.length != 0) ?
                                                        (<Button
                                                            display="flex"
                                                            cursor="pointer"
                                                            w="150px"
                                                            m="10px"
                                                            mt="20px"
                                                            pr="40px"
                                                            pl="40px"
                                                            colorScheme="orange.200"
                                                            backgroundColor={"#B24000"}
                                                            borderRadius="5px"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                        >
                                                            <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                                                {"Applied"}
                                                            </Text>
                                                        </Button>) :
                                                        (<Button
                                                            display="flex"
                                                            cursor="pointer"
                                                            w="150px"
                                                            m="10px"
                                                            mt="20px"
                                                            pr="40px"
                                                            pl="40px"
                                                            colorScheme="orange.200"
                                                            backgroundColor={"#E65300"}
                                                            borderRadius="5px"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            id={values.pollId}
                                                            onClick={() => {
                                                                handleApply(values.pollId, values.participants.length != 0, values.pollName, values.pollCreator.userId)
                                                                // , setApplyState(true)
                                                            }}
                                                        >
                                                            <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                                                {"Apply"}
                                                            </Text>
                                                        </Button>)
                                                    }</motion.div>
                                            </Link>
                                        ) : (
                                            <Button
                                                display="flex"
                                                cursor="pointer"
                                                w="150px"
                                                m="10px"
                                                mt="30px"
                                                pr="40px"
                                                pl="40px"
                                                colorScheme={"gray.200"}
                                                backgroundColor={"grey"}
                                                borderRadius="5px"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                                    Closed
                                                </Text>
                                            </Button>
                                        )
                                        ) : (<Box
                                            display="flex"
                                            w="300px"
                                            m="10px"
                                            mt="30px"
                                            pr="-20px"
                                            pl="140px"
                                            justifyContent="center"
                                            alignItems="center"
                                            color="gray.600"
                                        >
                                            <Text fontWeight="500" fontSize="20px" lineHeight="120%" textAlign="center" >
                                                This is your poll.
                                            </Text>
                                        </Box>)
                                    }
                                </Flex>

                            </Box></motion.div>
                    )
                })
                : (<Box display="block" pt="50px" position="fixed" left="50%" transform="translateX(-50%)" top={{ base: "30%", md: "25%" }}>
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
                        <Text textAlign="center" mt="-25px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                            Right now, there are no activity polls. Please wait a moment.
                        </Text></motion.div>
                </Box>)}
        </Box >
    )
}

export default DatingAllActivityBox