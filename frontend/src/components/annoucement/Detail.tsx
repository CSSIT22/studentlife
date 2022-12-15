import { Heading, Box, Text, Flex, Divider } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { GiHumanTarget, IoIosCalendar } from 'react-icons/all'

const Detail: FC<{
    annTopic: string,
    eventDate: Date,
    filterType: string,
    filterValue: string,
    annDetail: string,
    sender: string
}> = ({ annTopic, eventDate, filterType, filterValue, annDetail, sender }) => {
    const date = new Date(eventDate).getDate() + " " + eventDate.toLocaleString('en-us', { month: 'long' }) + " " + new Date(eventDate).getFullYear()
    return (
        <>
            <Heading as="h2" size="xl">
                {annTopic}
            </Heading>
            <Divider orientation="horizontal" maxW="5rem" borderColor={"black"} />
            <Flex gap={"5"}>
                <Flex alignItems={"center"}>
                    <IoIosCalendar size={25}/>
                    <Text pl="2">{date}</Text>
                </Flex>
                <Flex alignItems="center">
                    <GiHumanTarget size={25} />
                    <Text fontSize="md" pl="2">
                        {filterType}{" "}
                        {filterValue}
                    </Text>
                </Flex>

            </Flex>
            <Box>
                <Text fontSize="sm" align="justify">
                    {annDetail}
                </Text>
                <Flex pt="2rem" gap="2">
                    <Text  fontWeight={"semibold"}>Author: </Text>
                    <Text>{sender}</Text>
                </Flex>

            </Box>
        </>
    )
}

export default Detail