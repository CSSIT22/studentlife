import { Box, Button, Center, Circle, Flex, Heading, Image, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { BsFillPeopleFill } from "react-icons/bs"
import { POLL } from "./shared/poll"
import { Link } from "react-router-dom"

declare global {
    var date: string, time: string
}

// Component of your activity page
const DatingYourActivityBox = () => {
    const [poll, setPoll] = useState(POLL)

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
            {poll.map((values) => {
                // Need number of apply people from database
                const [applyPeople, setApplyPeople] = useState(2)
                // Need number of people who haven't approve in database
                const [notApprovePeople, setNotApprovePeople] = useState(2)
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
                        <Text fontSize="16px">Number of people: {handlePeople(values.participantMin, values.participantMax)}</Text>
                        <Flex justifyContent="end">
                            <Center>
                                {/* Need data from database and need condition checking for people/person*/}
                                <Text fontSize="16px">{applyPeople} people have applied</Text>
                            </Center>

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
                            <Circle backgroundColor="red" size="25px" ml="-24px" mr="20px" mt="7px" zIndex="2">
                                <Text fontSize="12px" color="white" as="b">
                                    {/* Number of people that haven't accept need to replace 2 with data from db*/}
                                    {notApprovePeople > 99 ? "99+" : notApprovePeople}
                                </Text>
                            </Circle>
                        </Flex>
                    </Box>
                )
            })}
        </Box>
    )
}

export default DatingYourActivityBox