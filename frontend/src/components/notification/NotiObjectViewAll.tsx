import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Stack, Text } from "@chakra-ui/react"
import React from "react"

const NotiObjectViewAll = () => {
    return (
        <Box shadow={"lg"} borderRadius="2xl" bg="white" padding={4}>
            <Stack direction={"row"} spacing={12}>
                <Center>
                    <Circle size="0.75em" bg="gray.500" />
                </Center>
                <Center>
                    <Avatar bg="pink.200">
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                </Center>
                <Stack>
                    <Text>
                        <b>User123456</b> Create a post asdfkj asdf asdad
                    </Text>
                    <Text fontSize={"xs"} color="gray.400"  >
                        10 hours ago
                    </Text>
                </Stack>
            </Stack>
        </Box>
    )
}

export default NotiObjectViewAll
