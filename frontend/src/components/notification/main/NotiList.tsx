import { Box, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import NotiObject from "./NotiObject"
import { OBJECTS } from "./objectsTest"

const NotiList: FC<{ selectedList: any[] }> = ({ selectedList }) => {
    //sort selectedList
    // console.log("selectedList")
    // console.log(selectedList)
    const sortedList = selectedList.sort((a, b) => {
        return b.date - a.date
    })
    // console.log("sortedList")
    // console.log(sortedList)
    const listDay: any[] = []
    function showDate(date: Date) {
        //prop = date
        const current = new Date()

        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24

        let sendDay = Math.round(date.getTime() / day)
        let today = Math.round(current.getTime() / day)

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
    console.log(listDay)

    return (
        <Box>
            {sortedList.map((el) => {
                return (
                    <Box>
                        {showDate(el.date)}
                        <Stack spacing={3}>
                            <NotiObject
                                key={el.id}
                                id={el.id}
                                avatarImg={el.avatarImg}
                                userName={el.userName}
                                description={el.description}
                                isRead={el.isRead}
                                date={el.date}
                            />
                        </Stack>
                    </Box>
                )
            })}
        </Box>
    )
}

export default NotiList
