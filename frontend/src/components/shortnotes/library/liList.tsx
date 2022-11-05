import { Box, Grid, GridItem, Text, Flex, Spacer, Heading, Square, VStack, Menu, MenuButton, Portal, MenuItem, MenuList } from "@chakra-ui/react"
import React, { FC } from "react"

const liList: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Box bg="white" h={100} rounded={8} boxShadow={"xl"}>
            <Grid h={"100%"} templateRows="repeat(3, 1fr)">
                <Spacer />
                <Heading size={"md"} p={2} textAlign={"center"}>
                    {name}
                </Heading>
                <Spacer />
            </Grid>
        </Box>
    )
}

export default liList
