import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import { MODULES } from "../moduleList/moduleTest"

const NotiObject: FC<{
    id: number
    avatarImg: string
    userName: string
    description: string
    isRead: boolean
    date: Date
}> = ({ id, avatarImg, userName, description, isRead, date }) => {
    function showStatus() {
        if (isRead) {
            return <Circle size="0.6em" bg="blackAlpha.400" />
        } else {
            return <Circle size="0.6em" bg="orange.500" />
        }
    }
    function showDate() {
        //use current date for testing
        const current = new Date()
        return (
            <Text fontSize={"xs"} color="gray.400">
                {current.getHours() - date.getHours()} hours ago
            </Text>
        )
    }
    function showDescription() {
        return (
            <p>
                <b>{userName}</b> <div dangerouslySetInnerHTML={{ __html: description }} />
            </p>
        )
    }
    return (
        <Box shadow={"lg"} borderRadius="2xl" bg="white" padding={2} key={id}>
            <Stack direction={"row"} spacing={3}>
                <Center>
                    <Avatar src={avatarImg} size={"sm"}>
                        <AvatarBadge boxSize="1em" bg="green.500" />
                    </Avatar>
                </Center>
                <Stack>
                    <Text fontSize={"sm"}>{showDescription()}</Text>
                    <Text fontSize={"xs"} color="gray.400">
                        {showDate()}
                    </Text>
                </Stack>
                <Spacer />
                <Center paddingRight={3}>{showStatus()}</Center>
            </Stack>
        </Box>
    )
}

export default NotiObject
