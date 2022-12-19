import { Box, Grid, GridItem, Text, Flex, Spacer, Heading, Square, VStack, Menu, MenuButton, Portal, MenuItem, MenuList } from "@chakra-ui/react"
import React, { FC } from "react"

const liList: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Grid bg="white" rounded={8} boxShadow={"md"} templateRows={"repeat(3, 1fr)"} h={100} _hover={{ cursor: "pointer", bg: '#f4f4f4' }} transition='all 0.2s cubic-bezier(.08,.52,.52,1)' >
            <Spacer />
            <Heading size={"md"} p={2} textAlign={"center"}>
                {name}
            </Heading>
            <Spacer />
        </Grid>
    )
}

export default liList
