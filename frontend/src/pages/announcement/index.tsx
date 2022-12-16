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
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceNav from "src/components/annoucement/AnnounceNav"


const index = () => {
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
    return (
        <AnnounceNav>
            {(() => {
                if (isLoading && !isError) {
                    return (
                        <AnnounceLoading />
                    )
                } else {
                    if (isError) {
                        return <AnnounceError />
                    } else {
                        return (
                            <>
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
                                                sender={el.annCreator.fName + " " + el.annCreator.lName}
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
                                                sender={el.annCreator.fName + " " + el.annCreator.lName}
                                                status={el.annPin[0].status}
                                                allPost={allPost}
                                                setAllPost={setAllPost}
                                                id={el.postId}
                                                key={el.postId}
                                                onClick={getpostidAndpinstatus}
                                            />
                                        )
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
