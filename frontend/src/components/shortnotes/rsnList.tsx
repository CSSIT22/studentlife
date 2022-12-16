import { Box, Grid, GridItem, Text, Flex, Spacer, SimpleGrid } from "@chakra-ui/react"
import React, { FC } from "react"
import { FaLock } from "react-icons/fa"

const rsnList: FC<{
    topic: String,
    viewAt: any,
    lock: any
}> = ({ topic, viewAt, lock }) => {
    return (
        <>
            <Grid templateRows={"repeat(3, 1fr)"} boxShadow={"md"} bg={"white"} rounded={8} px={2} py={2} _hover={{ bg: '#f4f4f4' }} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>
                <Flex fontSize={"2xl"} justifyContent={"center"}>{lock}</Flex>
                <GridItem>
                    <Text noOfLines={1}>{topic}</Text>
                </GridItem>
                <GridItem>
                    <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"end"}>
                        <Text fontSize={"xs"}  >
                            Viewed at {new Date(viewAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                        </Text>
                    </Flex>
                </GridItem>
            </Grid>
        </>
    )
}

export default rsnList
