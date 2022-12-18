import { Box, Button, Center, Circle, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { BsFillPeopleFill } from "react-icons/bs"
import { POLL } from "./shared/poll"
import { Link, useParams } from "react-router-dom"
import API from "src/function/API"
import { PollInfo } from "@apiType/dating"
import NoProfileImg from "../../components/dating/pic/noprofile.png"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import NoActivity from "../../components/dating/lottie/NoActivity.json"


declare global {
    var date: string, time: string
}

// Component of your activity page
const DatingYourActivityBox: FC<{ poll: PollInfo[] }> = ({ poll }) => {
    // const [poll, setPoll] = useState(POLL)
    const params = useParams()
    const didMount = useDidMount()

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    // Convert date in to format that easy to read
    function handlePollDate(dateTime: string) {
        const chooseDate = new Date(dateTime)
        const d = chooseDate.toLocaleDateString()
        // console.log(d)
        return d.substring(3, 5) + "/" + d.substring(0, 2) + "/" + chooseDate.getFullYear()
        // return chooseDate.getDate() + "/" + (chooseDate.getMonth() + 1) + "/" + chooseDate.getFullYear()
    }

    // Convert time in to format that easy to read
    function hanlePollTime(dateTime: string) {
        const time = new Date(dateTime)
        let hours = time.getHours() + 5
        let minutes = time.getMinutes()
        let ampm = hours >= 12 ? "pm" : "am"
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        let minute = minutes < 10 ? "0" + minutes : minutes
        let strTime = hours + ":" + minute + " " + ampm
        return strTime
    }

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

    // Make the link navigate to that poll id
    function goToPoll(pId: string) {
        return "/dating/poll/yourpoll/" + pId + "/"
    }

    return (
        <Box borderRadius="10px" color="black">
            {poll ? poll.map((values: PollInfo) => {
                // Need number of apply people from database
                // const [applyPeople, setApplyPeople] = useState(2)
                // Need number of people who haven't approve in database
                // const [notApprovePeople, setNotApprovePeople] = useState(2)
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
                        }}>
                        <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl" mb="30px">
                            <Flex>
                                <Link to={"/user/" + values.pollCreator.userId}>
                                    <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={values.pollCreator.image ?
                                            (import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.pollCreator.userId
                                            :
                                            NoProfileImg
                                        }
                                    /></Link>
                                <Center>
                                    <Text ml="30px" fontSize="20px">
                                        {values.pollCreator.fName}
                                        &nbsp;
                                        {values.pollCreator.lName}
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
                                        //pt="5px"
                                        overflowX={{ base: "auto", md: "visible" }}
                                        whiteSpace={{ base: "nowrap", md: "initial" }}
                                        style={{ WebkitOverflowScrolling: "touch" }}
                                    >
                                        {values.interests.map((i) => (
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

                                        ))}</Box>
                                </Box>
                            }
                            <Text fontSize="16px">
                                {values.pollText.length > 1 ? "Description:" : ""} {values.pollText}
                            </Text>
                            <Text fontSize="16px">Location: {values.pollPlace}</Text>

                            <Text fontSize="16px">Date: {globalThis.date}</Text>
                            <Text fontSize="16px">Time: {globalThis.time}</Text>
                            <Text fontSize="16px">Number of people: {handlePeople(values.participantMin, values.participantMax)}</Text>
                            <Flex justifyContent="end">
                                <Center>
                                    {/* Need data from database and need condition checking for people/person*/}
                                    <Text fontSize="16px">{values.participants.length} {values.participants.length == 1 ? "person has " : "people have "} applied</Text>
                                </Center>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{ display: "flex" }}
                                    whileTap={{ scale: 1 }}
                                    whileHover={{ scale: 1.2, }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 360,
                                        damping: 20,
                                    }}
                                >
                                    <Link to={goToPoll(values.pollId)} style={{ textDecoration: "none" }}>
                                        <Button
                                            display="flex-end"
                                            type="submit"
                                            form="new-note"
                                            borderRadius="full"
                                            colorScheme="orange"
                                            m="10px"
                                            p="5px"
                                            mt="10px"
                                        >
                                            <Center>
                                                <BsFillPeopleFill />
                                            </Center>
                                        </Button>

                                    </Link>
                                    <Box zIndex="2">
                                        <Link to={goToPoll(values.pollId)} style={{ textDecoration: "none" }} >
                                            <Circle backgroundColor="red" size="25px" ml="-24px" mt="7px" >
                                                <Text fontSize="12px" color="white" as="b">
                                                    {values.participants.length - values.participants.filter(i => i.isAccepted).length > 99 ? "99+" : values.participants.length - values.participants.filter(i => i.isAccepted).length}
                                                    {/* Number of people that haven't accept need to replace 2 with data from db*/}
                                                    {/* {2 > 99 ? "99+" : 2} */}
                                                </Text>
                                            </Circle>
                                        </Link>
                                    </Box>
                                </motion.div>
                            </Flex>
                        </Box></motion.div>
                )
            }) : (<Box display="block" pt="50px" position="fixed" left="50%" transform="translateX(-50%)" top={{ base: "30%", md: "25%" }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 20,
                    }}>
                    <Lottie animationData={NoActivity} loop={true} style={{ scale: "0.7" }} /></motion.div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 20,
                    }}>
                    <Text textAlign="center" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                        Right now, you don't have any activity polls.
                    </Text></motion.div>
            </Box>)}

        </Box>
    )
}

export default DatingYourActivityBox
