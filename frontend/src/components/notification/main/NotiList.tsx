import { Box, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import NotiObject from "./NotiObject"
import { OBJECTS } from "./objectsTest"

const NotiList: FC<{ selectedList: any[]; date: Date }> = ({ selectedList, date }) => {
    //prop = date
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthsArray[date.getMonth()]
    const notiListdate: any[] = selectedList.filter((el) => el.date === date)
    // console.log("-------------------")
    // console.log(notiListdate)

    return (
        <Box>
            {notiListdate.map((el) => {
                return (
                    <Box>
                        <Text fontSize={"sm"}>{month + " " + date.getDate() + ", " + date.getFullYear()}</Text>
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
