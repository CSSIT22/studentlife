import React, { useEffect } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnAnnouncementPage from "../../components/annoucement/PostOnAnnouncementPage"
import AppBody from "../../components/share/app/AppBody"
import { Box, Flex, SimpleGrid, Spacer } from "@chakra-ui/react"
import { postInfoTest } from "./postInfoTest"
import {post} from '@apiType/announcement'
import API from "src/function/API"

const index = () => {
    // const post = [
    //     { topic: "hello World", sender: "SAMO-SIT", status: false, id: 10 },
    //     { topic: "SIT Esport", sender: "SAMO-SIT", status: false, id: 11 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: false, id: 12 },
    //     { topic: "SIT Volunteer", sender: "SAMO-SIT", status: false, id: 13 },
    //
    // const nonexpired = postInfoTest.filter((el) => {
    //     const current = new Date().toISOString
    // })
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const year = day * 365

    const date = new Date()
    const current = Math.round(date.getTime() / day)

    // console.log(postInfoTest[0].expiredOfPost);

    const [allPost, setAllPost] = React.useState<post[]>([])
    const getData = API.get("/announcement/getPostOnAnnouncement")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data))
    },[])

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            <Flex alignItems={"center"}>
                <HeaderPage head="Announcement" />
                <Link to={"/announcement/create"}>
                    <IoIosAddCircle fontSize={"2rem"} color="#E65300" />
                </Link>
            </Flex>
            {allPost
                .filter((p) => {
                    return p.pinStatus == true 
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.topic}
                            sender={el.sender}
                            status={el.pinStatus}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.postId}
                            key={el.postId}
                        />
                    )
                })}
            {allPost
                .filter((p) => {
                    return p.pinStatus == false 
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.topic}
                            sender={el.sender}
                            status={el.pinStatus}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.postId}
                            key={el.postId}
                        />
                    )
                })}
        </AppBody>
    )
}

export default index
