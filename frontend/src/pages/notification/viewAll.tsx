import { Box, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import React from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/Modulelist"
import NotiList from "../../components/notification/NotiList"
import AppBody from "../../components/share/app/AppBody"

const viewAll = () => {
    return (
        <AppBody>
            <Flex>
                <Flex>
                    <Center>
                        <Heading size={"md"}>Activity :</Heading>
                    </Center>
                    <Modulelist />
                </Flex>
                <Spacer />
                <MarkRead />
            </Flex>
            <Box borderRadius="lg" shadow={"2xl"} backgroundColor="white" padding={4} height="75vh">
                <NotiList />
            </Box>
            <Box padding={4}>
                <Center> &#60; 1 2 3 4 5 &#62; </Center>
            </Box>
        </AppBody>
    )
}

export default viewAll
