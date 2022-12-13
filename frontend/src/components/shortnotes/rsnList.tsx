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
                <Flex justifyContent={"center"}>{lock}</Flex>
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
            {/* <Grid templateColumns='repeat(8, 1fr)' boxShadow={"md"} bg={"white"} rounded={8} p={3} _hover={{ bg: '#f4f4f4' }} transition='all 0.2s cubic-bezier(.08,.52,.52,1)' justifyContent={"center"}>
                <GridItem colSpan={7}>
                    <Flex direction={"column"} >
                        <Flex justifyContent={"center"}>
                            <Flex noOfLines={1}>{topic}</Flex>
                        </Flex>
                        <Flex fontSize={"xs"} justifyContent={"center"}>
                            Viewed at {new Date(viewAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                        </Flex>
                    </Flex>
                </GridItem>
                <Flex ml={2} alignSelf={"center"}>{lock}</Flex>
            </Grid> */}
        </>
    )
}

export default rsnList
