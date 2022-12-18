import { Avatar, Box, Flex, HStack, VStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { buffer_to_img } from "./function/64_to_img"

let d = new Date()
d.toLocaleString

type props = {
    message: string
    timeSent: string
    from: string
    color: any
    myId: string
    image : {
        data : string
        type : string
    } | null
    name : any
}

const TextBar = ({ message, timeSent, from, color, myId, image ,name}: props) => {
    const isMe = from === myId
    const align = isMe ? "flex-end" : "flex-start"
    const bottomRradius = isMe ? 0 : 32
    const bottomLradius = isMe ? 32 : 0
    function rederAvatar(e: any) {
        if (e == false) {
            return <Avatar src={(image != null)?buffer_to_img(image.data):""} />
        }
    }
    return (
        <VStack marginTop={2} alignItems={align} alignSelf={align}>
            <HStack>
                {rederAvatar(isMe)}
                <Flex direction={"column"}>
                    <Box>{isMe ? "" :name }</Box>
                    <Box
                        bg={isMe ? color : "white"}
                        paddingX={6}
                        paddingY={1}
                        maxWidth={80}
                        borderTopLeftRadius={32}
                        borderTopRightRadius={32}
                        borderBottomRightRadius={bottomRradius}
                        borderBottomLeftRadius={bottomLradius}
                    >
                        {message}
                    </Box>
                </Flex>
            </HStack>
            <Text fontSize="xs" color="grey">
                {dayjs(timeSent).format("H:M")}
            </Text>
        </VStack>
    )
}
export default TextBar

