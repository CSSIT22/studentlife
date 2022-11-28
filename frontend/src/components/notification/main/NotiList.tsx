import { Box, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import NotiObject from "./NotiObject"

const NotiList: FC<{ selectedList: any[]; onClick: Function }> = ({ selectedList, onClick }) => {
    //sort selectedList
    const sortedList = selectedList.sort((a, b) => {
        return b.date - a.date
    })

    //show date
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
    // console.log(listDay)

    return (
        <Box>
            {sortedList?.map((el) => {
                return (
                    <Box key={el.id}>
                        {showDate(new Date(el.date))}
                        <Stack spacing={3}>
                            <NotiObject
                                id={el.id}
                                userId={el.user}
                                description={el.description}
                                isRead={el.isRead}
                                date={new Date(el.date)}
                                link={el.link}
                                onClick={onClick}
                            />
                        </Stack>
                    </Box>
                )
            })}
        </Box>
    )
}

export default NotiList
