import { Box, Button, Center, Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { POLL } from "./shared/poll"

const DatingAllActivityBox = () => {
    const [poll, setPoll] = useState(POLL)

    return (
        <Box borderRadius="10px" color="black">
            {poll.map((values) => {
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
                        <Text fontSize="16px">Location: {values.pollAppointAt}</Text>
                        <Text fontSize="16px">Date: {values.pollAppointAt}</Text>
                        <Text fontSize="16px">Time: {values.pollAppointAt}</Text>
                        <Text fontSize="16px">
                            Number of people: {values.participantMin}-{values.participantMax} people
                        </Text>

                        <Button
                            type="submit"
                            form="new-note"
                            borderRadius="5px"
                            colorScheme="orange"
                            // onClick={() => handleSubmit()}
                            m="10px"
                            p="10px"
                            pr="50px"
                            pl="50px"
                        >
                            Apply
                        </Button>
                    </Box>
                )
            })}
        </Box>
    )
}

export default DatingAllActivityBox
