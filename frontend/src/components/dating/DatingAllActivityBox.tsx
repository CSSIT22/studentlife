import { Box, Button, Center, Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { POLL } from "./shared/poll"
import { Link } from "react-router-dom"
import { POLL_APPLICANT } from "./shared/poll_applicant"
import { useToast } from "@chakra-ui/react"

declare global {
    var date: string, time: string
}

const DatingAllActivityBox = () => {
    const [poll, setPoll] = useState(POLL)
    const [pollApplicant, setPollApplicant] = useState(POLL_APPLICANT)
    const [applied, setAppiled] = useState(false)

    const toast = useToast()
    function handleApply(pId: string) {
        isApply(pId) ? (
            <></>
        ) : (
            // NEED TO ADD DATA TO DATABASE HERE!!!!
            // setPollApplicant(pId);
            toast({
                title: "Applied success.",
                description: "You have registered for the poll. Now you can chat with the poll creator.",
                status: "success",
                duration: 4500,
                isClosable: true,
                position: "top",
            })
        )
    }

    function handlePollDate(dateTime: string) {
        const chooseDate = new Date(dateTime)
        // console.log(chooseDate.getMonth())
        return chooseDate.getDate() + "/" + (chooseDate.getMonth() + 1) + "/" + chooseDate.getFullYear()
    }

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

    function isApply(pId: string) {
        for (let i = 0; i < pollApplicant.length; i++) {
            if (pId === pollApplicant[i].poll_id) {
                return true
            }
        }
        return false
    }

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
                        <Heading fontSize="20px" pt="10px" pb="10px">
                            {values.pollName}
                        </Heading>
                        <Text fontSize="16px" pb="20px">
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
                            {values.isOpen ? (
                                <Link to="/dating/poll/appliedpoll" style={{ textDecoration: "none" }} onClick={() => handleApply(values.pollId)}>
                                    <Box
                                        display="flex"
                                        cursor="pointer"
                                        w="150px"
                                        m="10px"
                                        mt="20px"
                                        pr="40px"
                                        pl="40px"
                                        backgroundColor={isApply(values.pollId) ? "#B24000" : "#E65300"}
                                        borderRadius="5px"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                                            {isApply(values.pollId) ? "Applied" : "Apply"}
                                        </Text>
                                    </Box>
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
        </Box>
    )
}

export default DatingAllActivityBox
