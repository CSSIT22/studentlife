import { Box, Grid, GridItem, Text, Flex, Spacer, Hide } from "@chakra-ui/react"
import React, { FC } from "react"

const snList: FC<{
    topic: String
    course: String
    date: String | any
    lock: any
}> = ({ topic, course, date, lock }) => {
    return (
        <Box boxShadow={"md"} bg={"white"} rounded={8} p={5} w="100%" _hover={{ bg: '#f4f4f4' }} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>
            <Grid templateColumns="repeat(9, 1fr)">
                <GridItem colSpan={4}>
                    <Flex alignItems={"center"} justifyContent={"start"} h={"100%"}>
                        <Text>{topic}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex alignItems={"center"} justifyContent={"center"} h={"100%"}>
                        <Text>{course}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2}>
                    <Hide below="sm">
                        <Flex alignItems={"center"} justifyContent={"center"} h={"100%"}>
                            <Text>{new Date(date).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })}</Text>
                        </Flex>
                    </Hide>
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
