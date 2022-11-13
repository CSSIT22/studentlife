import { Button, Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import { MODULES } from "../moduleList/moduleTest"
import { USER } from "../main/data/userProfile"

const NotiObjectViewAll: FC<{
    id: number
    userId: string
    description: string
    isRead: boolean
    date: Date
    module: string
}> = ({ id, description, isRead, date, module, userId }) => {
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
                    <Text fontSize={"sm"} color="gray.400">
                        {diffHours} hours ago
                    </Text>
                )
            } else {
                // console.log(diffMinutes + " minutes ago")
                return (
                    <Text fontSize={"sm"} color="gray.400">
                        {diffMinutes} minutes ago
                    </Text>
                )
            }
        } else if (diffDay > 0 && diffDay < 7) {
            // console.log(diffDay + " days ago")
            return (
                <Text fontSize={"sm"} color="gray.400">
                    {diffDay} days ago
                </Text>
            )
        } else if (diffDay >= 7 && diffDay < 30) {
            const diffWeek = Math.floor(diffDay / 7)
            // console.log(diffWeek + " weeks ago")
            return (
                <Text fontSize={"sm"} color="gray.400">
                    {diffWeek} weeks ago
                </Text>
            )
        } else if (diffDay >= 30 && diffDay < 365) {
            const diffMonth = Math.floor(diffDay / 30)
            // console.log(diffMonth + " months ago")
            return (
                <Text fontSize={"sm"} color="gray.400">
                    {diffMonth} months ago
                </Text>
            )
        } else {
            const diffYear = Math.floor(diffDay / 365)
            // console.log(diffYear + " years ago")
            return (
                <Text fontSize={"sm"} color="gray.400">
                    {diffYear} years ago
                </Text>
            )
        }
    }
    function showDescription() {
        return (
            <Stack direction={"row"}>
                <div dangerouslySetInnerHTML={{ __html: description }} /> <b>- {module}</b>{" "}
            </Stack>
        )
    }

    function showUser() {
        var user = USER.filter((el) => el.id == userId)
        var userStatus = user[0].isOnline
        //console.log(user)

        if (userStatus) {
            return (
                <Avatar src={user[0].avatarImg} size={"md"}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
            )
        } else {
            return (
                <Avatar src={user[0].avatarImg} size={"md"}>
                    <AvatarBadge boxSize="1em" bg="gray" />
                </Avatar>
            )
        }
    }

    return (
        <Box
            as="button"
            bg={"white"}
            _hover={{ bg: "#cdcdcd", transitionDuration: "0.2s" }}
            transitionDuration="0.2s"
            borderRadius="2xl"
            padding={2}
            key={id}
        >
            <Stack direction={"row"} spacing={12}>
                <Box>
                    <Stack direction={"row"} spacing={12}>
                        <Center paddingRight={3} paddingLeft={4}>
                            {showStatus()}
                        </Center>
                        <Center>{showUser()}</Center>
                        <Stack direction={"row"} spacing={300} padding={5}>
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
