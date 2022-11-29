import React, { useEffect } from "react"
import AppBody from "../../../components/share/app/AppBody"
import { GrClose } from "react-icons/gr"
import { Flex, Heading, Spacer, Text, useBoolean } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PostOnApproval from "../../../components/annoucement/PostOnApproval"
import HeaderPage from "../../../components/annoucement/HeaderPage"
import { postInfoTest } from "../postInfoTest"
import { announcement, post } from "@apiType/announcement"
import API from "src/function/API"

const index = () => {
    const [allPost, setAllPost] = React.useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/announcement/getwaitingpost")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [])
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
                <HeaderPage head="Approval" />
            </Flex>
            {allPost
                // .filter((fl) => fl.status == "waiting")
                .map((el) => {
                    return <PostOnApproval topic={el.annLanguage[0].annTopic} sender={el.annCreator.fName+" "+el.annCreator.lName} id={el.postId} key={el.postId} />
                })}
        </AppBody>
    )
}

export default index
