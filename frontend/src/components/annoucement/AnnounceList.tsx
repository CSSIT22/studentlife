import { announcement, announcement_approve2 } from '@apiType/announcement'
import { Box, Flex, Heading, VStack, Text, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from 'src/function/API'
import Announce from './Announce'

const AnnounceList = () => {
    const [allPost2, setAllPost2] = useState<announcement[]>([])
    const getDataPost = API.get("/announcement/getPostOnAnnouncement")
    useEffect(() => {
        getDataPost.then((res) => setAllPost2(res.data))
    }, [])

    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    const approveTime: announcement_approve2[] = allPost2.map((el) => {
        const apTime = new Date(el.annApprove.approveTime)
        const dEpd = Math.round(apTime.getTime())
        return { postId: el.postId, approveTime: dEpd }
    })

    const sort = approveTime.sort();

    let fivepost = []
    for (let i = allPost2.length - 1; i > allPost2.length - 6; i--) {
        if (allPost2[i] != undefined) {
            fivepost.push(allPost2[i])
        }
    }
    return (
        <Box borderWidth="1px" borderRadius="lg" backgroundColor={"white"} minW="sm" maxW="sm" p={"3"}>
            <Flex>
                <Heading size={"sm"} pr="3" borderRight={"1px"}>Announcement</Heading>
                <Link to="/announcement">
                    <Text fontSize={"sm"} pl="3" fontWeight={"semibold"} _hover={{ color: "orange.500" }} transition="0.2s" cursor={"pointer"}>show more</Text>
                </Link>

            </Flex>
            <>
                {fivepost?.map((el) => {
                    const to = "/announcement/detail/"+el.postId
                    const event = (el.annLanguage[0].annDetail.split("~"))[0]
                    const date = new Date(event).getDate()
                    const month = new Date(event).toLocaleString('en-us', { month: 'short' })
                    return <Announce topic={el.annLanguage[0].annTopic} to={to} date={date+""} month={month} key={el.postId}/>
                })}
            </>

        </Box>
    )
}



export default AnnounceList