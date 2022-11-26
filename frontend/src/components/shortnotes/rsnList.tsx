import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"
import { FaLock } from "react-icons/fa"

const rsnList: FC<{
    topic: String,
    viewAt: any,
    lock: any
}> = ({ topic, viewAt, lock }) => {
    return (
        <Grid templateRows={"repeat(3, 1fr)"} boxShadow={"md"} bg={"white"} rounded={8} px={2} py={2} _hover={{ bg: '#f5f5f5' }} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>
            <Flex justifyContent={"center"}>{lock == false ? <FaLock /> : null}</Flex>

            <GridItem>
                {topic}
            </GridItem>
            <GridItem>
                <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"end"}>
                    <Text fontSize={"xs"}  >
                        Viewed at {new Date(viewAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                    </Text>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default rsnList
