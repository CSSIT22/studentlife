import React from "react"
import { IoIosAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnAnnouncementPage from "../../components/annoucement/PostOnAnnouncementPage"
import AppBody from "../../components/share/app/AppBody"
import { Box, Flex, SimpleGrid, Spacer } from "@chakra-ui/react"
import { postInfoTest } from "./postInfoTest"

const index = () => {
    // const post = [
    //     { topic: "hello World", sender: "SAMO-SIT", status: false, id: 10 },
    //     { topic: "SIT Esport", sender: "SAMO-SIT", status: false, id: 11 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: false, id: 12 },
    //     { topic: "SIT Volunteer", sender: "SAMO-SIT", status: false, id: 13 },
    // ]
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const [selectPost, setSelectPost] = React.useState(Number)
    const onSelectPost = (postId: number) => {
        setSelectPost(postId)
        // console.log(postId);
    }
    // const detail = () => {
    //     return (
    //         <Link to="/announcement/detail/:postid">
    //             <DetailPost selectPost={selectPost} posts={allPost} />
    //         </Link>
    //     )
    // }
    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            <Flex alignItems={"center"}>
                <HeaderPage head="Announcement" />
                <Link to={"/announcement/create"}>
                    <IoIosAddCircle fontSize={"2rem"} />
                </Link>
            </Flex>
            {allPost
                .filter((p) => {
                    return p.pinStatus == true && p.isApprove == true
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
                            onSelectPost={onSelectPost}
                            key={el.postId}
                        />
                    )
                })}
            {allPost
                .filter((p) => {
                    return p.pinStatus == false && p.isApprove == true
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
                            onSelectPost={onSelectPost}
                            key={el.postId}
                        />
                    )
                })}
        </AppBody>
    )
}

export default index
