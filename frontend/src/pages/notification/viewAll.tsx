import { Box, Center, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/moduleList/Modulelist"
import NotiList from "../../components/notification/main/NotiList"
import NotiListViewAll from "../../components/notification/viewAll/NotiListViewAll"
import NotiObjectViewAll from "../../components/notification/viewAll/NotiObjectViewAll"
import AppBody from "../../components/share/app/AppBody"

const viewAll = () => {
    return (
        <AppBody>
            <Flex padding={3}>
                <Flex>
                    <Center>
                        <Heading size={"md"}>Activity :</Heading>
                    </Center>
                    <Modulelist />
                </Flex>
                <Spacer />
                <MarkRead />
            </Flex>
            <Box borderRadius= "lg" shadow={"2xl"} backgroundColor="white" padding={1} height="75vh">
                <Stack padding={6} height="100%" overflow="auto">
                    <NotiListViewAll />
                    <NotiListViewAll />
                    <NotiListViewAll />
                </Stack>
            </Box>
            <Box padding={4}>
                <Center> &#60; 1 2 3 4 5 &#62; </Center>
            </Box>
        </AppBody>
    )
}

export default viewAll
