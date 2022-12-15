import React, { useEffect, useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnAnnouncementPage from "../../components/annoucement/PostOnAnnouncementPage"
import AppBody from "../../components/share/app/AppBody"
import { Box, Flex, Heading, SimpleGrid, Spacer, useBoolean } from "@chakra-ui/react"
import { postInfoTest } from "./postInfoTest"
import { announcement, post } from "@apiType/announcement"
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

    // console.log(postInfoTest[0].expiredOfPost);
    const [toggle, settoggle] = useState(false)
    const [allPost, setAllPost] = React.useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getDataPost = API.get("/announcement/getPostOnAnnouncement")
    useEffect(() => {
        getDataPost.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [toggle])

    const getpostidAndpinstatus = () => {
        settoggle(!toggle)
    }
    if (isLoading)
        return (
            <AppBody>
                <Heading>Loading</Heading>
            </AppBody>
        )
    if (isError)
        return <AppBody><Heading color={"red"}>There is an Error</Heading></AppBody>

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
                    return p.annPin[0].status == true
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.annLanguage[0].annTopic}
                            sender={el.annCreator.fName+" "+el.annCreator.lName}
                            status={el.annPin[0].status}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.postId}
                            key={el.postId}
                            onClick={getpostidAndpinstatus}
                        />
                    )
                })}
            {allPost
                .filter((p) => {
                    return p.annPin[0].status == false
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.annLanguage[0].annTopic}
                            sender={el.annCreator.fName+" "+el.annCreator.lName}
                            status={el.annPin[0].status}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.postId}
                            key={el.postId}
                            onClick={getpostidAndpinstatus}
                        />
                    )
                })}
        </AppBody>
    )
}

export default index
