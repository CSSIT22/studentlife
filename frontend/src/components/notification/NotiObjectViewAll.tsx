import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Stack, Text, Flex, Spacer } from "@chakra-ui/react"
import React from "react"

const NotiObjectViewAll = () => {
    return (
        <Box borderRadius="2xl" bg="white" padding={4}>
            <Stack direction={"row"} spacing={12}>
                <Center>
                    <Circle size="0.75em" bg="gray.500" />
                </Center>
                <Center>
                    <Avatar bg="pink.200">
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                </Center>
                <Stack direction={"row"} spacing={150}>
                    <Text>
                        <b>User123456</b> Create a post asdfkj asdf asdad - XXX </Text>
                    <Spacer />
                    <Center fontSize={"xs"} color="gray.400">
                10 hours ago
            </Center>
                    {/* <Box fontSize={"xs"} color="gray.400"  >
                        10 hours ago
                    </Box> */}
                </Stack>
            </Stack>
            
        </Box> 
    )
}

export default NotiObjectViewAll
