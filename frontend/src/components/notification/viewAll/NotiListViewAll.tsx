import { Box, Stack, Text, Divider } from "@chakra-ui/react"
import React, { FC } from "react"
import NotiObjectViewAll from "./NotiObjectViewAll"

const NotiListViewAll: FC<{ selectedList: any[] }> = ({ selectedList }) => {
    //sort selectedList
    // console.log("selectedList")
    // console.log(selectedList)
    const sortedList = selectedList.sort((a, b) => {
        return b.date - a.date
    })
    // console.log("sortedList")
    // console.log(sortedList)
    const list: any[] = []
    function showDate(date: Date) {
        //prop = date
        const current = new Date()

        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24

        let sendDay = Math.round(date.getTime() / day)
        let today = Math.round(current.getTime() / day)

        if (sendDay == today) {
            if (!list.includes("today")) {
                list.push("today")
                return (
                    <Text fontSize={"sm"} padding={2}>
                        Today
                    </Text>
                )
            } else {
                return <Box height={"1rem"}></Box>
            }
        } else if (sendDay == today - 1) {
            if (!list.includes("yesterday")) {
                list.push("yesterday")
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

            if (!list.includes(month + " " + date.getDate() + ", " + date.getFullYear())) {
                list.push(month + " " + date.getDate() + ", " + date.getFullYear())
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
    console.log(list)

    // const notiListdate = sortedList.filter((el) => el.date === date)
    //console.log(notiListdate)

    return (
        <Box>
            {sortedList.map((el) => {
                return (
                    <Box>
                        <Text as="b">{showDate(el.date)}</Text>
                        <Stack spacing={3}>
                            <NotiObjectViewAll
                                key={el.id}
                                id={el.id}
                                userId={el.user}
                                description={el.description}
                                isRead={el.isRead}
                                date={el.date}
                                module={el.module}
                                link={el.link}
                            />
                        </Stack>
                        <Divider />
                    </Box>
                )
            })}
        </Box>
    )
}

export default NotiListViewAll
