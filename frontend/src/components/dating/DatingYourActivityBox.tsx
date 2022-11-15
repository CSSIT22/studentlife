import { Box, Button, Center, Flex, Heading, Icon, Image, Spacer, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { BsFillPeopleFill } from "react-icons/bs"
import { POLL } from "./shared/poll"

declare global {
    var date: string, time: string
}

const DatingYourActivityBox = () => {
    const [poll, setPoll] = useState(POLL)

    function handlePollDate(dateTime: string) {
        return dateTime.substring(0, 10)
    }

    function hanlePollTime(dateTime: string) {
        const time = new Date(dateTime)
        time.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })
        const t = time.toString()
        return t
        //t.substring(11, 16)
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
                            Description: {values.pollText}
                        </Text>
                        <Text fontSize="16px">Location: {values.pollPlace}</Text>

                        <Text fontSize="16px">Date: {globalThis.date}</Text>
                        <Text fontSize="16px">Time: {globalThis.time}</Text>
                        <Text fontSize="16px">
                            Number of people: {values.participantMin}-{values.participantMax} people
                        </Text>
                        <Flex justifyContent="end">
                            <Button
                                display="flex-end"
                                type="submit"
                                form="new-note"
                                borderRadius="full"
                                colorScheme="orange"
                                // onClick={() => handleSubmit()}
                                m="10px"
                                p="5px"
                                mt="30px"
                            >
                                <Center>
                                    <BsFillPeopleFill />
                                </Center>
                            </Button>
                        </Flex>
                    </Box>
                )
            })}
        </Box>
    )
}

export default DatingYourActivityBox
