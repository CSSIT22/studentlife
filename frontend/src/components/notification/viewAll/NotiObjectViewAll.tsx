import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import { MODULES } from "../moduleList/moduleTest"

const NotiObjectViewAll: FC<{
    id: number
    avatarImg: string
    userName: string
    description: string
    isRead: boolean
    date: Date
}> = ({ id, avatarImg, userName, description, isRead, date }) => {
    function showStatus() {
        if (isRead) {
            return <Circle size="0.7rem" bg="blackAlpha.400" />
        } else {
            return <Circle size="0.7rem" bg="orange.500" />
        }
    }
    function showDate() {
        //use current date for testing
        const current = new Date()

        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const year = day * 365

        let sendDay = Math.round(date.getTime() / day)
        // console.log(sendDay)
        let currentDay = Math.round(current.getTime() / day)
        // console.log(currentDay)
        let diffDay = currentDay - sendDay
        // console.log(diffDay)
        if (diffDay == 0) {
            let sendMinutes = Math.floor(date.getTime() / minute)
            let currentMinutes = Math.floor(current.getTime() / minute)
            let diffMinutes = currentMinutes - sendMinutes
            if (diffMinutes >= 60) {
                let sendHours = Math.floor(date.getTime() / hour)
                // console.log(sendHours)
                let currentHours = Math.floor(current.getTime() / hour)
                // console.log(currentHours)
                let diffHours = currentHours - sendHours

                // console.log(diffHours + " hours ago")
                return (
                    <Text fontSize={"xs"} color="gray.400">
                        {diffHours} hours ago
                    </Text>
                )
            } else {
                // console.log(diffMinutes + " minutes ago")
                return (
                    <Text fontSize={"xs"} color="gray.400">
                        {diffMinutes} minutes ago
                    </Text>
                )
            }
        } else if (diffDay > 0 && diffDay < 7) {
            // console.log(diffDay + " days ago")
            return (
                <Text fontSize={"xs"} color="gray.400">
                    {diffDay} days ago
                </Text>
            )
        } else if (diffDay >= 7 && diffDay < 30) {
            const diffWeek = Math.floor(diffDay / 7)
            // console.log(diffWeek + " weeks ago")
            return (
                <Text fontSize={"xs"} color="gray.400">
                    {diffWeek} weeks ago
                </Text>
            )
        } else if (diffDay >= 30 && diffDay < 365) {
            const diffMonth = Math.floor(diffDay / 30)
            // console.log(diffMonth + " months ago")
            return (
                <Text fontSize={"xs"} color="gray.400">
                    {diffMonth} months ago
                </Text>
            )
        } else {
            const diffYear = Math.floor(diffDay / 365)
            // console.log(diffYear + " years ago")
            return (
                <Text fontSize={"xs"} color="gray.400">
                    {diffYear} years ago
                </Text>
            )
        }
    }
    function showDescription() {
        return (
            <p>
                <b>{userName}</b> <div dangerouslySetInnerHTML={{ __html: description }} />
            </p>
        )
    }
    return (
        <Box shadow={"lg"} borderRadius="2xl" bg="white" padding={4} key={id}>
            <Stack direction={"row"} spacing={12}>
                <Box>
                    <Stack direction={"row"} spacing={12}>
                        <Center paddingRight={3} paddingLeft={4}>
                            {showStatus()}
                        </Center>
                        <Center>
                            <Avatar src={avatarImg} size={"md"}>
                                <AvatarBadge boxSize="1.2rem" bg="green.500" />
                            </Avatar>
                        </Center>
                        <Stack direction={"row"} spacing={300}>
                            <Text fontSize={"sm"}>{showDescription()}</Text>
                        </Stack>
                    </Stack>
                </Box>

                <Spacer />

                <Center fontSize={"xs"} color="gray.400">
                    <Box width={"6rem"}>{showDate()}</Box>
                </Center>
            </Stack>
        </Box>
    )
}

export default NotiObjectViewAll
