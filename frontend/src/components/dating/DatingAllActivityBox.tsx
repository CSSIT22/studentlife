import { Box, Button, Center, Flex, Heading, Image, Spacer, Tag, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { POLL } from "./shared/poll"
import { Link, useParams } from "react-router-dom"
import { POLL_APPLICANT } from "./shared/poll_applicant"
import { useToast } from "@chakra-ui/react"
import { INTERESTS } from "./shared/interests"
import API from "src/function/API"

declare global {
    var date: string, time: string
}

// Component of all activity page
const DatingAllActivityBox = () => {
    const params = useParams()
    // const [poll, setPoll] = useState(POLL)
    const [poll, setPoll] = useState(POLL)
    // const [interests, setInterests] = useState(INTERESTS)
    const [pollApplicant, setPollApplicant] = useState(POLL_APPLICANT)
    let count = 1
    useEffect(() => {
        if (count != 0) {
            count--
            //Wrong API
            API.get("/dating/yourpoll/getYourPolls" + params.pollId).then((data) => {
                setPoll(data.data)
                console.log("Poll data " + poll);
            }).catch((err) => console.log(err));
        }
    })

    function appiled(pId: string) {
        const today = new Date()
        // NEED TO ADD DATA TO DATABASE HERE!!!!
        console.log("Is appiled " + pId)
        console.log(today)
    }

    const toast = useToast()
    function handleApply(pId: string, apState: boolean) {
        apState ? (
            <></>
        ) : (
            // If user apply -> tost, add data to db, change button state
            (appiled(pId),
                toast({
                    title: "Applied success",
                    description: "You have registered for the poll. Now you can chat with the poll creator.",
                    status: "success",
                    duration: 4500,
                    isClosable: true,
                    position: "top",
                }))
        )
    }

    // Convert date in to format that easy to read
    function handlePollDate(dateTime: string) {
        const chooseDate = new Date(dateTime)
        // console.log(chooseDate.getMonth())
        return chooseDate.getDate() + "/" + (chooseDate.getMonth() + 1) + "/" + chooseDate.getFullYear()
    }

    // Convert time in to format that easy to read
    function hanlePollTime(dateTime: string) {
        const time = new Date(dateTime)
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
    function isApply(pId: string) {
        for (let i = 0; i < pollApplicant.length; i++) {
            if (pId === pollApplicant[i].poll_id) {
                return true
            }
        }
        return false
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

    return (
        <Box borderRadius="10px" color="black">
            {poll.map((values) => {
                // For set the apply state only
                const [applyState, setApplyState] = useState(isApply(values.pollId))
                globalThis.date = handlePollDate(values.pollAppointAt)
                globalThis.time = hanlePollTime(values.pollAppointAt)
                return (
                    <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl" mb="30px">
                        <Flex>
                            <Image
                                borderRadius="full"
                                boxSize="78px"
                                objectFit="cover"
                                src={values.creator.url}
                                alt={values.creator.Fname + " " + values.creator.Lname}
                            />
                            <Center>
                                <Text ml="30px" fontSize="20px">
                                    {values.creator.Fname}
                                    &nbsp;
                                    {values.creator.Lname}
                                </Text>
                            </Center>
                        </Flex>
                        <Heading fontSize="20px" pt="10px">
                            {values.pollName}
                        </Heading>
                        {values.pollInterest.length < 1 ? <Text pb="20px"></Text> :
                            <Box pt="20px" height="70px" overflow={{ base: "hidden", md: "visible" }}>
                                <Box
                                    height="70px"
                                    //pt="5px"
                                    overflowX={{ base: "auto", md: "visible" }}
                                    whiteSpace={{ base: "nowrap", md: "initial" }}
                                    style={{ WebkitOverflowScrolling: "touch" }}
                                >
                                    {values.pollInterest.map((i) => (
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
                                                {i}
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
                        <Text fontSize="16px">
                            Number of people: {handlePeople(values.participantMin, values.participantMax)}
                            {/* {values.participantMin}-{values.participantMax} people */}
                        </Text>
                        <Flex justifyContent="end">
                            {/* Check if poll open or close to display different button */}
                            {values.isOpen ? (
                                // If the poll have been applied user can click to navigate to appiledpoll page
                                <Link to={applyState ? "/dating/poll/appliedpoll" : ""} style={{ textDecoration: "none" }}>
                                    {/* <Box style={{ textDecoration: "none" }}> */}
                                    <Box
                                        display="flex"
                                        cursor="pointer"
                                        w="150px"
                                        m="10px"
                                        mt="20px"
                                        pr="40px"
                                        pl="40px"
                                        backgroundColor={applyState ? "#B24000" : "#E65300"}
                                        borderRadius="5px"
                                        justifyContent="center"
                                        alignItems="center"
                                        onClick={() => {
                                            handleApply(values.pollId, applyState), setApplyState(true)
                                        }}
                                    >
                                        <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                            {applyState ? "Applied" : "Apply"}
                                        </Text>
                                    </Box>
                                    {/* </Box> */}
                                </Link>
                            ) : (
                                <Box
                                    display="flex"
                                    cursor="pointer"
                                    w="150px"
                                    m="10px"
                                    mt="30px"
                                    pr="40px"
                                    pl="40px"
                                    backgroundColor={"grey"}
                                    borderRadius="5px"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                        Closed
                                    </Text>
                                </Box>
                            )}
                        </Flex>
                    </Box>
                )
            })}
        </Box >
    )
}

export default DatingAllActivityBox
