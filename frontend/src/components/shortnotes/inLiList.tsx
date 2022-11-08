import { Box, Grid, GridItem, Text, Flex, Spacer, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const inLiList: FC<{
    name: String
    course: String
}> = ({ name, course }) => {
    return (
        <Box boxShadow={"md"} bg={"white"} rounded={8} p={5} w="100%">
            <Grid templateColumns="repeat(2, 1fr)">
                <GridItem colSpan={1}>
                    <Text>{name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{course}</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default inLiList
