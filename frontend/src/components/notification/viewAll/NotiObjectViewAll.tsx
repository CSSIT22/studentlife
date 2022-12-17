import { Button, Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import { templates } from "../templates"
import { USER } from "../main/mockupData/userProfile"
import API from "src/function/API"
import { NotiValue } from "@apiType/notification"

const NotiObjectViewAll: FC<{
    id: string
    template: string
    isRead: boolean
    date: Date
    module: string
    url: string
    onClick: Function
    sender: string
    values: NotiValue[]
}> = ({ id, template, isRead, date, module, url, onClick, sender, values }) => {

    const [senderImg, setsenderImg] = useState([])

    useEffect(() => {
        API.get("/notification/getsenderimage/" + sender).then(
            item => setsenderImg(item.data.image)
        )
    }, [])

    //console.log(senderImg);


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

    let v1 = ""
    let v2 = ""
    let v3 = ""
    function showDescription() {

        //console.log(getvalue)
        // const [valueNotiObject, setValueNotiObject] = useState([])
        // useEffect(() => {
        //     const getvalue = API.get("/notification/getvalue/?notiobjectId=" + id)
        //     getvalue.then((res: { data: React.SetStateAction<never[]> }) => {
        //         setValueNotiObject(res.data)
        //     })
        // }, [])
        //console.log(valueNotiObject)

        values.forEach((item: NotiValue) => {
            if (item.notiObjectId == id) {
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

    function buffer_to_img(data: any) {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
        return `data:image/png;base64,${base64String}`
    }
    function handleImg(e: any) {
        if (e === null) {
            return ""
        }
        else {
            return buffer_to_img(e.data)
        }
    }

    function showUser() {
        // var user = USER.filter((el) => el.id == userId)
        // var userStatus = user[0].isOnline
        // //console.log(user)

        // if (userStatus) {
        //     return (
        //         <Avatar src={user[0].avatarImg} size={"md"}>
        //             <AvatarBadge boxSize="1em" bg="green.500" />
        //         </Avatar>
        //     )
        // } else {
        //     return (
        //         <Avatar src={user[0].avatarImg} size={"md"}>
        //             <AvatarBadge boxSize="1em" bg="gray" />
        //         </Avatar>
        //     )
        // }
        if (sender == null) {
            return (
                <Avatar src="./Logo_01.png" size={"sm"} />
            )
        } else {
            return (
                <Avatar src={handleImg(senderImg)} size={"sm"} />
            )
        }
    }
    function read() {
        API.post("/notification/readnotiobject/" + id)
    }

    return (
        <Box
            as="button"
            bg={"white"}
            _hover={{ bg: "#cdcdcd", transitionDuration: "0.2s" }}
            transitionDuration="0.2s"
            borderRadius="2xl"
            padding={2}
            onClick={() => {
                read(), onClick()
            }}
        >
            <a href={url}>
                <Stack direction={"row"} spacing={12}>
                    <Box>
                        <Stack direction={"row"} spacing={12}>
                            <Center paddingRight={3} paddingLeft={4}>
                                {showStatus()}
                            </Center>
                            <Center>{showUser()}</Center>
                            <Stack direction={"row"} spacing={5} padding={5}>
                                {showDescription()}
                                {/* <Box as="button"
                                    shadow={"lg"}
                                    borderRadius="1xl"
                                    bg="#D6D6D6"> */}
                                <Button shadow={"lg"}
                                    size='xs'
                                    padding={1}
                                    bg="#E3E3E3">
                                    {module}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>

                    <Spacer />

                    <Center fontSize={"xs"} color="gray.400">
                        <Box width={"6rem"}>{showDate()}</Box>
                    </Center>
                </Stack>
            </a>
        </Box>
    )
}

export default NotiObjectViewAll
