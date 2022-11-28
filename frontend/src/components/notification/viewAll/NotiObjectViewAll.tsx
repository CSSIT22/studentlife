import { Button, Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import { MODULES } from "../moduleList/moduleTest"
import { USER } from "../main/mockupData/userProfile"
import API from "src/function/API"
import { SHOP_REVIEW_COMMENT } from "../templates/SHOP_REVIEW_COMMENT"
import { TRANSACTION_SUCCESS } from "../templates/TRANSACTION_SUCCESS"
import { SCHEDULE_EVENT } from "../templates/SCHEDULE_EVENT"
import { QnA_ANSWER_ANONYMOUS } from "../templates/QnA_ANSWER_ANONYMOUS"
import { QnA_ANSWER } from "../templates/QnA_ANSWER"
import { DATING_MATCH } from "../templates/DATING_MATCH"
import { DATING_MATCH_FRIEND } from "../templates/DATING_MATCH_FRIEND"
import { DATING_ACCEPTED } from "../templates/DATING_ACCEPTED"
import { DATING_INTERESTED } from "../templates/DATING_INTERESTED"
import { ANNOUNCEMENT_WAIT_FOR_APPROVE } from "../templates/ANNOUNCEMENT_WAIT_FOR_APPROVE"
import { ANNOUNCEMENT_APPROVED } from "../templates/ANNOUNCEMENT_APPROVED"
import { ANNOUNCEMENT_NEW } from "../templates/ANNOUNCEMENT_NEW"
import { CHAT_MESSAGE } from "../templates/CHAT_MESSAGE"
import { COMMUNITY_INVITE } from "../templates/COMMUNITY_INVITE"
import { COMMUNITY_POST } from "../templates/COMMUNITY"
import { TODO_LIST_TASK } from "../templates/TODO_LIST_TASK"

const NotiObjectViewAll: FC<{
    id: number
    template: string
    isRead: boolean
    date: Date
    module: string
    url: string
    onClick: Function
    sender: string
}> = ({ id, template, isRead, date, module, url, onClick, sender }) => {
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
    // function showDescription() {
    //     return (
    //         <Stack direction={"row"}>
    //             <Text dangerouslySetInnerHTML={{ __html: description }} /> <b>- {module}</b>{" "}
    //         </Stack>
    //     )
    // }

    let v1 = ""
    let v2 = ""
    let v3 = ""
    function showDescription() {
        const getvalue = API.get("/notification/getvalue")
        //console.log(getvalue)
        const [valueNotiObject, setValueNotiObject] = useState([])
        useEffect(() => {
            getvalue.then((res: { data: React.SetStateAction<never[]> }) => {
                setValueNotiObject(res.data)
            })
        }, [])
        //console.log(valueNotiObject)

        valueNotiObject.forEach((item: any) => {
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


        if (template == "TODO_LIST_TASK") {
            let result1 = (TODO_LIST_TASK[0].template).replace(/v1/g, v1)
            //console.log(result1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            //console.log(result3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "COMMUNITY_POST") {
            let result1 = (COMMUNITY_POST[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "COMMUNITY_INVITE") {
            let result1 = (COMMUNITY_INVITE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "CHAT_MESSAGE") {
            let result1 = (CHAT_MESSAGE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "ANNOUNCEMENT_NEW") {
            let result1 = (ANNOUNCEMENT_NEW[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "ANNOUNCEMENT_APPROVED") {
            let result1 = (ANNOUNCEMENT_APPROVED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "ANNOUNCEMENT_WAIT_FOR_APPROVE") {
            let result1 = (ANNOUNCEMENT_WAIT_FOR_APPROVE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "DATING_INTERESTED") {
            let result1 = (DATING_INTERESTED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "DATING_ACCEPTED") {
            let result1 = (DATING_ACCEPTED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "DATING_MATCH_FRIEND") {
            let result1 = (DATING_MATCH_FRIEND[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "DATING_MATCH") {
            let result1 = (DATING_MATCH[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "QnA_ANSWER") {
            let result1 = (QnA_ANSWER[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "QnA_ANSWER_ANONYMOUS") {
            let result1 = (QnA_ANSWER_ANONYMOUS[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "SCHEDULE_EVENT") {
            let result1 = (SCHEDULE_EVENT[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "SHOP_REVIEW_COMMENT") {
            let result1 = (SHOP_REVIEW_COMMENT[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        } else if (template == "TRANSACTION_SUCCESS") {
            let result1 = (TRANSACTION_SUCCESS[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <><Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} /></>
        }



        // return <Text fontSize={"sm"} textAlign={"left"}> showDescription </Text>
        // <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: description }} />
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
        return (
            //<Avatar src={user[0].avatarImg} size={"sm"} />
            <Avatar size={"sm"} />

        )
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
