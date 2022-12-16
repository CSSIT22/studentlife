import { NotiValue } from "@apiType/notification"
import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text, useEditable } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import API from "src/function/API"
import { showUser } from "../functions/showUser"
import { templates } from "../functions/templates"

const NotiObject: FC<{
    objectId: string
    template: string
    date: Date
    isRead: boolean
    module: string
    url: string
    onClick: Function
    sender: string
    values: NotiValue[]
    userId: string
}> = ({ userId, objectId, template, isRead, date, module, url, onClick, sender, values }) => {



    //console.log(senderImg);


    function showStatus() {
        if (isRead) {
            return <Circle size="0.6em" bg="gray" />
        } else {
            return <Circle size="0.6em" bg="orange.500" />
        }
    }
    function showDate() {

        const current = new Date()

        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const year = day * 365

        let sendDay = Math.floor(date.getTime() / day)
        // console.log(sendDay)
        let currentDay = Math.floor(current.getTime() / day)
        // console.log(currentDay)
        let diffDay = currentDay - sendDay
        //console.log(diffDay)
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
                    <Text fontSize={"xs"} color="gray.400" align={"left"}>
                        {diffHours} hours ago
                    </Text>
                )
            } else {
                // console.log(diffMinutes + " minutes ago")
                return (
                    <Text fontSize={"xs"} color="gray.400" align={"left"}>
                        {diffMinutes} minutes ago
                    </Text>
                )
            }
        } else if (diffDay > 0 && diffDay < 7) {
            // console.log(diffDay + " days ago")
            return (
                <Text fontSize={"xs"} color="gray.400" align={"left"}>
                    {diffDay} days ago
                </Text>
            )
        } else if (diffDay >= 7 && diffDay < 30) {
            const diffWeek = Math.floor(diffDay / 7)
            // console.log(diffWeek + " weeks ago")
            return (
                <Text fontSize={"xs"} color="gray.400" align={"left"}>
                    {diffWeek} weeks ago
                </Text>
            )
        } else if (diffDay >= 30 && diffDay < 365) {
            const diffMonth = Math.floor(diffDay / 30)
            // console.log(diffMonth + " months ago")
            return (
                <Text fontSize={"xs"} color="gray.400" align={"left"}>
                    {diffMonth} months ago
                </Text>
            )
        } else {
            const diffYear = Math.floor(diffDay / 365)
            // console.log(diffYear + " years ago")
            return (
                <Text fontSize={"xs"} color="gray.400" align={"left"}>
                    {diffYear} years ago
                </Text>
            )
        }
    }


    function showDescription() {


        // console.log(getvalue)
        let v1 = ""
        let v2 = ""
        let v3 = ""
        //console.log(getvalue)
        // const [valueNotiObject, setValueNotiObject] = useState([])
        // useEffect(() => {
        //     const getvalue = API.get("/notification/getvalue")
        //     getvalue.then((res: { data: React.SetStateAction<never[]> }) => {
        //         setValueNotiObject(res.data)
        //     })
        // }, [])
        // console.log(valueNotiObject)
        // console.log(values);

        values.forEach((item: NotiValue) => {
            if (item.notiObjectId == objectId) {
                if (v1 == "") {
                    v1 = item.value
                } else if (v2 == "") {
                    v2 = item.value
                } else if (v3 == "") {
                    v3 = item.value
                }
            }
        });
        //console.log(v1, v2, v3)

        let count = 0;
        let result1;
        let result2;
        let result3;
        templates.forEach((item: any) => {
            if (template == item.title) {
                //console.log(template)
                result1 = (templates[count].template).replace(/v1/g, v1)
                //console.log(result1)
                result2 = (result1).replace(/v2/g, v2)
                result3 = (result2).replace(/v3/g, v3)
                //console.log(result3)
            }
            count++;
        })
        //console.log(count)
        if (result3 != null) {
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        }
    }


    function read() {
        API.post("/notification/readnotiobject/" + objectId)
    }

    return (
        <Box
            as="button"
            transitionDuration="0.2s"
            _hover={{ bg: "#cdcdcd", transitionDuration: "0.2s" }}
            shadow={"lg"}
            borderRadius="2xl"
            bg="white"
            padding={2}
            onClick={() => {
                read(), onClick()
            }}
        >
            <a href={url}>
                <Stack direction={"row"} spacing={4} padding={"1"}>
                    <Center>{showUser(sender, userId, module)}</Center>
                    <Stack>
                        <div>
                            {showDescription()}

                        </div>
                        {showDate()}
                    </Stack>

                    <Spacer />
                    <Center paddingRight={3}>{showStatus()}</Center>
                </Stack>
            </a>
        </Box>
    )
}

export default NotiObject


