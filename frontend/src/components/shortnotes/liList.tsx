import { Box, Grid, GridItem, Text, Flex, Spacer, Heading, Square, VStack, Menu, MenuButton, Portal, MenuItem, MenuList } from "@chakra-ui/react"
import React, { FC } from "react"

const liList: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Grid bg="white" rounded={8} boxShadow={"xl"} templateRows={"repeat(3, 1fr)"} h={100}>
            <Spacer />
            <Heading size={"md"} p={2} textAlign={"center"}>
                {name}
            </Heading>
            <Spacer />
        </Grid>
    )
}

export default liList
