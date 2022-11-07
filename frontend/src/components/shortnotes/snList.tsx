import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"

const snList: FC<{
    topic: String
    course: String
    date: String
    lock: String
}> = ({ topic, course, date, lock }) => {
    return (
        <Box boxShadow={"md"} bg={"white"} rounded={8} p={5} w="100%">
            <Grid templateColumns="repeat(9, 1fr)">
                <GridItem colSpan={4}>
                    <Text>{topic}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Text>{course}</Text>
                </GridItem>
                <GridItem colSpan={2} textAlign={"center"}>
                    <Text>{date}</Text>
                </GridItem>
                <GridItem colSpan={1} textAlign={"right"}>
                    <Text>{lock}</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default snList
