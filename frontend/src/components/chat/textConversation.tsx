import { Box, VStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

let d = new Date()
d.toLocaleString

type props = {
    message: string
    timeSent: string
    from: string
}

export const TextBar = ({ message, timeSent, from }: props) => {
    const isMe = from === "me"
    const align = isMe ? "flex-end" : "flex-start"
    const bottomRradius = isMe ? 0 : 32
    const bottomLradius = isMe ? 32 : 0
    return (
        <VStack marginTop={3} alignItems={align} alignSelf={align}>
            <Box
                bg={isMe ? "#E68E5C" : "white"}
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
            <Text fontSize="xs" color="grey">
                {timeSent}
            </Text>
        </VStack>
    )
}
export default TextBar
