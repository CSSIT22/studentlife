import { Box, Grid, GridItem, Text, Flex, Spacer, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const cmList: FC<{
    name: String
    desc: String
}> = ({ name, desc }) => {
    return (
        <Grid templateRows="repeat(3, 1fr)" bg={"white"} boxShadow={"base"} rounded={8} p={4}>
            <GridItem rowSpan={1}>
                <Heading size={"sm"}>{name}</Heading>
            </GridItem>
            <GridItem rowSpan={2}>{desc}</GridItem>
        </Grid>
    )
}

export default cmList
