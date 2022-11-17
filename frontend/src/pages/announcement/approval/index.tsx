import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import { GrClose } from "react-icons/gr"
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PostOnApproval from "../../../components/annoucement/PostOnApproval"
import HeaderPage from "../../../components/annoucement/HeaderPage"
import { postInfoTest } from "../postInfoTest"

const index = () => {
    const [allPost, setAllPost] = React.useState(postInfoTest)

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
                    return <PostOnApproval topic={el.topic} sender={el.sender} status={el.status} id={el.postId} key={el.postId} />
                })}
        </AppBody>
    )
}

export default index
