import { Avatar, AvatarBadge, Badge, Box, Center, Circle, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { FaDumpsterFire } from "react-icons/fa"
import API from "src/function/API"
import { MODULES } from "../moduleList/moduleTest"
import { ANNOUNCEMENT_APPROVED } from "../templates/ANNOUNCEMENT_APPROVED"
import { ANNOUNCEMENT_NEW } from "../templates/ANNOUNCEMENT_NEW"
import { ANNOUNCEMENT_WAIT_FOR_APPROVE } from "../templates/ANNOUNCEMENT_WAIT_FOR_APPROVE"
import { CHAT_MESSAGE } from "../templates/CHAT_MESSAGE"
import { COMMUNITY_POST } from "../templates/COMMUNITY"
import { COMMUNITY_INVITE } from "../templates/COMMUNITY_INVITE"
import { DATING_ACCEPTED } from "../templates/DATING_ACCEPTED"
import { DATING_INTERESTED } from "../templates/DATING_INTERESTED"
import { DATING_MATCH } from "../templates/DATING_MATCH"
import { DATING_MATCH_FRIEND } from "../templates/DATING_MATCH_FRIEND"
import { QnA_ANSWER } from "../templates/QnA_ANSWER"
import { QnA_ANSWER_ANONYMOUS } from "../templates/QnA_ANSWER_ANONYMOUS"
import { SCHEDULE_EVENT } from "../templates/SCHEDULE_EVENT"
import { SHOP_REVIEW_COMMENT } from "../templates/SHOP_REVIEW_COMMENT"
import { TODO_LIST_TASK } from "../templates/TODO_LIST_TASK"
import { TRANSACTION_SUCCESS } from "../templates/TRANSACTION_SUCCESS"

import { USER } from "./mockupData/userProfile"

const NotiObject: FC<{
    id: string
    template: string
    date: Date
    isRead: boolean
    module: string
    url: string
    onClick: Function
    sender: string
}> = ({ id, template, isRead, date, module, url, onClick, sender }) => {
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
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "COMMUNITY_POST") {
            let result1 = (COMMUNITY_POST[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "COMMUNITY_INVITE") {
            let result1 = (COMMUNITY_INVITE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "CHAT_MESSAGE") {
            let result1 = (CHAT_MESSAGE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "ANNOUNCEMENT_NEW") {
            let result1 = (ANNOUNCEMENT_NEW[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "ANNOUNCEMENT_APPROVED") {
            let result1 = (ANNOUNCEMENT_APPROVED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "ANNOUNCEMENT_WAIT_FOR_APPROVE") {
            let result1 = (ANNOUNCEMENT_WAIT_FOR_APPROVE[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "DATING_INTERESTED") {
            let result1 = (DATING_INTERESTED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "DATING_ACCEPTED") {
            let result1 = (DATING_ACCEPTED[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "DATING_MATCH_FRIEND") {
            let result1 = (DATING_MATCH_FRIEND[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "DATING_MATCH") {
            let result1 = (DATING_MATCH[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "QnA_ANSWER") {
            let result1 = (QnA_ANSWER[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "QnA_ANSWER_ANONYMOUS") {
            let result1 = (QnA_ANSWER_ANONYMOUS[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "SCHEDULE_EVENT") {
            let result1 = (SCHEDULE_EVENT[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "SHOP_REVIEW_COMMENT") {
            let result1 = (SHOP_REVIEW_COMMENT[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        } else if (template == "TRANSACTION_SUCCESS") {
            let result1 = (TRANSACTION_SUCCESS[0].template).replace(/v1/g, v1)
            let result2 = (result1).replace(/v2/g, v2)
            let result3 = (result2).replace(/v3/g, v3)
            return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
        }



        // return <Text fontSize={"sm"} textAlign={"left"}> showDescription </Text>
        // <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: description }} />
    }


    function showUser() {
        //var user = USER.filter((el) => el.id == userId)

        //console.log(user)

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
                <Stack direction={"row"} spacing={5} padding={"1"}>
                    <Center>{showUser()}</Center>

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


