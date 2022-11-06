import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Stack, Text } from "@chakra-ui/react"
import React from "react"

const NotiObject = () => {
    return (
        <Box shadow={"lg"} borderRadius="2xl" bg="white" padding={2}>
            <Stack direction={"row"} spacing={3}>
                <Center>
                    <Avatar bg="blackAlpha.200" size={"sm"}>
                        <AvatarBadge boxSize="1em" bg="green.500" />
                    </Avatar>
                </Center>
                <Stack>
                    <Text fontSize={"sm"}>
                        <b>User123456</b> Create a post asdfkj asdf asdad
                    </Text>
                    <Text fontSize={"xs"} color="gray.400">
                        10 hours ago
                    </Text>
                </Stack>
                <Center>
                    <Circle size="0.6em" bg="blackAlpha.600" />
                </Center>
            </Stack>
        </Box>
    )
}

export default NotiObject
