import { Box, Grid, GridItem, Text, Flex, Spacer, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const cmList: FC<{
    name: String
    desc: String
    date: String | any
}> = ({ name, desc, date }) => {
    return (
        <Grid templateRows="repeat(3, 1fr)" bg={"white"} boxShadow={"base"} rounded={8} p={3} w={"100%"} >
            <GridItem>
                <Heading size={"sm"}>{name}</Heading>
            </GridItem>
            <GridItem>{desc}</GridItem>
            <GridItem >
                <Flex w={"100%"} h={"100%"} justifyContent={"end"} >
                    <Text fontSize={"xs"} alignSelf={"end"}>
                        {new Date(date).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                    </Text>
                </Flex>
            </GridItem>
        </Grid >
    )
}

export default cmList
