import { Box, Grid, GridItem, Text, Flex, Spacer, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const inLiList: FC<{
    name: String
    course: String
}> = ({ name, course }) => {
    return (
        <Grid templateColumns="repeat(5, 1fr)" boxShadow={"md"} bg={"white"} rounded={8} p={5} w="100%" h={"100px"} alignItems={"center"}>
            <GridItem colSpan={4}>
                <Text>{name}</Text>
            </GridItem>
            <GridItem colSpan={1} textAlign={"right"}>
                <Text>{course}</Text>
            </GridItem>
        </Grid>
    )
}

export default inLiList
