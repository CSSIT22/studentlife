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
    //console.log(sortedList)

    function showDate(date: Date) {
        //prop = date
        const current = new Date()

        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24

        let sendDay = Math.round(date.getTime() / day)
        let today = Math.round(current.getTime() / day)

        if (sendDay == today) {
            return <Text fontSize={"sm"}>Today</Text>
        } else if (sendDay == today - 1) {
            return <Text fontSize={"sm"}>Yesterday</Text>
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
            return <Text fontSize={"sm"}>{month + " " + date.getDate() + ", " + date.getFullYear()}</Text>
        }
    }

    // const notiListdate = sortedList.filter((el) => el.date === date)
    //console.log(notiListdate)

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
