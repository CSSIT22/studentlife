import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"

const snList: FC<{
    topic: String
    course: String
    date: String
    lock: any
}> = ({ topic, course, date, lock }) => {
    return (
        <Box boxShadow={"md"} bg={"white"} rounded={8} p={5} w="100%">
            <Grid templateColumns="repeat(9, 1fr)">
                <GridItem colSpan={4}>
                    <Text>{topic}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex alignItems={"center"} h={"100%"}>
                        <Text>{course}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex alignItems={"center"} justifyContent={"center"} h={"100%"}>
                        <Text>{date}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} textAlign={"right"}>
                    <Flex alignItems={"center"} justifyContent={"right"} h={"100%"}>
                        <Text>{lock}</Text>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default snList
