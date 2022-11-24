import React, { useEffect } from "react"
import AppBody from "../../../components/share/app/AppBody"
import { GrClose } from "react-icons/gr"
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PostOnApproval from "../../../components/annoucement/PostOnApproval"
import HeaderPage from "../../../components/annoucement/HeaderPage"
import { postInfoTest } from "../postInfoTest"
import { post } from "@apiType/announcement"
import API from "src/function/API"

const index = () => {
    const [allPost, setAllPost] = React.useState<post[]>([])
    const getData = API.get("/announcement/getwaitingpost")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data))
    }, [])

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
                <HeaderPage head="Approval" />
            </Flex>
            {allPost
                .filter((fl) => fl.status == "waiting")
                .map((el) => {
                    return <PostOnApproval topic={el.annTopic} sender={el.sender} status={el.status} id={el.postId} key={el.postId} />
                })}
        </AppBody>
    )
}

export default index
