import { Flex, Box, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Announce: FC<{
    topic: string,
    date: string,
    month: string,
    to: string
}> = ({ topic, date, month, to }) => {
    return (
        <Flex py="3" alignItems={"center"}>
            <Box pr={"5"} borderRightColor="grey" borderRight={"1px"}>
                <Flex alignItems={"center"} justifyContent="center" flexDirection={"column"}>
                    <Text color={"orange.500"} fontWeight="bold">{date}</Text>
                    <Text color={"orange.500"} fontWeight="bold">{month}</Text>
                </Flex>
            </Box>
            <Box pl={"5"}>
                <Link to={to}>
                    <Text fontWeight={"light"} fontSize="sm" _hover={{ color: "orange.500" }} transition="0.2s">{topic}</Text>
                    <Text fontSize={"sm"} fontWeight="semibold" color={"orange.500"}>Read More</Text>
                </Link>

            </Box>
        </Flex>
    )
}

export default Announce