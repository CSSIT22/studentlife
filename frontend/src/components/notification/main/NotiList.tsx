import { Notiobject } from "@apiType/notification";
import { Box, Center, Show, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import NotiObject from "./NotiObject"

const NotiList: FC<{ selectedList: any[], module: string; onClick: Function }> = ({ selectedList, onClick, module }) => {

    //sort selectedList
    // const sortedList = selectedList.sort((a, b) => {
    //     return new Date(b.notiObject.date).getTime() - new Date(a.notiObject.date).getTime()
    // })
    if (selectedList.length == 0) {
        return (
            <Box h={"100vh"}>
                <Center h={"100%"}>You don't have any notifications</Center>
            </Box >
        )
    } else {
        const sortedList = selectedList
        //console.log(sortedList)
        //show date
        const listDay: any[] = []
        function showDate(date: Date) {
            //prop = date
            const current = new Date()

            const minute = 1000 * 60
            const hour = minute * 60
            const day = hour * 24

            let sendDay = Math.floor(date.getTime() / day)
            let today = Math.floor(current.getTime() / day)

            if (sendDay == today) {
                if (!listDay.includes("today")) {
                    listDay.push("today")
                    return (
                        <Text fontSize={"sm"} padding={2}>
                            Today
                        </Text>
                    )
                } else {
                    return <Box height={"1rem"}></Box>
                }
            } else if (sendDay == today - 1) {
                if (!listDay.includes("yesterday")) {
                    listDay.push("yesterday")
                    return (
                        <Text fontSize={"sm"} padding={2}>
                            Yesterday
                        </Text>
                    )
                } else {
                    return <Box height={"1rem"}></Box>
                }
            } else {
                const monthsArray = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ]
                let month = monthsArray[date.getMonth()]

                if (!listDay.includes(month + " " + date.getDate() + ", " + date.getFullYear())) {
                    listDay.push(month + " " + date.getDate() + ", " + date.getFullYear())
                    return (
                        <Text padding={2} fontSize={"sm"}>
                            {month + " " + date.getDate() + ", " + date.getFullYear()}
                        </Text>
                    )
                } else {
                    return <Box height={"1rem"}></Box>
                }
            }
        }
        // console.log(listDay)
        //console.log(sortedList);

        return (
            <Box>
                {sortedList?.slice(0, 20).map((el) => {
                    return (
                        <Box key={el.notiObjectId}>
                            {showDate(new Date(el.notiObject.date))}
                            <Stack spacing={3}>
                                <NotiObject
                                    objectId={el.notiObject.notiObjectId}
                                    template={el.notiObject.template}
                                    date={new Date(el.notiObject.date)}
                                    isRead={el.isRead}
                                    module={el.notiObject.module}
                                    url={el.notiObject.url}
                                    onClick={onClick}
                                    sender={el.notiObject.userId}
                                    values={el.notiObject.values}
                                    userId={el.userId}
                                />
                            </Stack>
                        </Box>
                    )
                })}
                <Show above="md">
                    <Text align={"center"} fontSize="xs" padding={2}>Click View all to see more notifications..</Text>
                </Show>

            </Box>
        )
    }

}

export default NotiList