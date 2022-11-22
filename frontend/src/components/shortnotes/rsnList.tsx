import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"

const rsnList: FC<{
    topic: String,
    viewAt: any
}> = ({ topic, viewAt }) => {
    return (
        <Grid templateRows={"repeat(3, 1fr)"} boxShadow={"md"} bg={"white"} rounded={8} px={2} py={2}>
            <Spacer />
            <GridItem>
                {topic}
            </GridItem>
            <GridItem>
                <Flex w={"100%"} h={"100%"} justifyContent={"end"} alignItems={"end"}>
                    <Text fontSize={"xs"}  >
                        Viewed at {new Date(viewAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                    </Text>
                </Flex>

            </GridItem>

        </Grid>
    )
}

export default rsnList
