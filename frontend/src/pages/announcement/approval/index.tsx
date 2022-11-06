import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import { GrClose } from "react-icons/gr"
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PostOnApproval from "../../../components/annoucement/PostOnApproval"
import HeaderPage from "../../../components/annoucement/HeaderPage"

const index = () => {
    const post = [
        { topic: "hello World", sender: "SAMO-SIT", status: "waiting", id: 10 },
        { topic: "SIT Esport", sender: "SAMO-SIT", status: "waiting", id: 11 },
        { topic: "SIT Valentine", sender: "SAMO-SIT", status: "waiting", id: 12 },
        { topic: "SIT Valentine", sender: "SAMO-SIT", status: "waiting", id: 13 },
    ]
    const [allPost, setAllPost] = React.useState(post)
    const [statusPostRequest, setStatusPostRequest] = React.useState("")
    const [selectPost, setSelectPost] = React.useState(Number)
    const onClick = (status: string, postId: number) => {
        setStatusPostRequest(status)
        setSelectPost(postId)
    }
    console.log(statusPostRequest + " " + selectPost)

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            <HeaderPage head="Approval" />
            {allPost
                .filter((fl) => fl.status == "waiting")
                .map((el) => {
                    return <PostOnApproval topic={el.topic} sender={el.sender} status={el.status} id={el.id} onClick={onClick} key={el.id} />
                })}
        </AppBody>
    )
}

export default index
