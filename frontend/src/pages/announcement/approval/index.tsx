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
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceNav from "src/components/annoucement/AnnounceNav"

const index = () => {
    const [allPost, setAllPost] = React.useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/announcement/getwaitingpost")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [])

    return (
        <AnnounceNav>
            {(() => {
                if (isLoading && !isError) {
                    return <AnnounceLoading />
                } else {
                    if (isError) {
                        return <AnnounceError />
                    } else {
                        return (
                            <>
                                <Flex alignItems={"center"}>
                                    <HeaderPage head="Approval" />
                                </Flex>
                                {allPost
                                    .map((el) => {
                                        return <PostOnApproval topic={el.annLanguage[0].annTopic} sender={el.annCreator.fName + " " + el.annCreator.lName} id={el.postId} key={el.postId} />
                                    })}
                            </>
                        )
                    }
                }
            })()}
        </AnnounceNav>

    )
}

export default index
