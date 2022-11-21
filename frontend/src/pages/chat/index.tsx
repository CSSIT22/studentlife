import { Box, Center, Flex, Hide, HStack, Portal } from "@chakra-ui/react"
import { useEffect } from "react"
import API from "src/function/API"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"
const Chat = () => {
    return (
        <AppBody>
            <HStack>
                <Clist />
                <Hide below="md">
                    <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
                        <Box fontSize={"3xl"}>Start conversation 🌈</Box>
                    </Flex>
                </Hide>
            </HStack>
        </AppBody>
    )
}
export default Chat
